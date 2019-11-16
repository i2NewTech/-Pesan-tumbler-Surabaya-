
/**
 * Utiltities for loading audio and computing mel spectrograms, based on
 * {@link https://github.com/google/web-audio-recognition/blob/librosa-compat}.
 * TODO(adarob): Rewrite using tfjs.
 *
 * @license
 * Copyright 2018 Google Inc. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
//@ts-ignore
import * as tf from '@tensorflow/tfjs';
import * as FFT from 'fft.js';
import * as ndarray from 'ndarray';
//@ts-ignore
import * as resample from 'ndarray-resample';

import {fetch, getOfflineAudioContext, isSafari} from '../core/compat/global';

import * as logging from './logging';

const SAMPLE_RATE = 16000;
const offlineCtx = getOfflineAudioContext(SAMPLE_RATE);

/**
 * Parameters for computing a spectrogram from audio.
 */
export interface SpecParams {
  sampleRate: number;
  hopLength?: number;
  winLength?: number;
  nFft?: number;
  nMels?: number;
  power?: number;
  fMin?: number;
  fMax?: number;
}

/**
 * Loads audio into AudioBuffer from a URL to transcribe.
 *
 * By default, audio is loaded at 16kHz monophonic for compatibility with
 * model. In Safari, audio must be loaded at 44.1kHz instead.
 *
 * @param url A path to a audio file to load.
 * @returns The loaded audio in an AudioBuffer.
 */
export async function loadAudioFromUrl(url: string): Promise<AudioBuffer> {
  return fetch(url)
      .then((body) => body.arrayBuffer())
      .then((buffer) => offlineCtx.decodeAudioData(buffer));
}

/**
 * Loads audio into AudioBuffer from a Blob to transcribe.
 *
 * By default, audio is loaded at 16kHz monophonic for compatibility with
 * model. In Safari, audio must be loaded at 44.1kHz instead.
 *
 * @param url A path to a audio file to load.
 * @returns The loaded audio in an AudioBuffer.
 */
export async function loadAudioFromFile(blob: Blob): Promise<AudioBuffer> {
  const fileReader = new FileReader();
  const loadFile: Promise<ArrayBuffer> = new Promise((resolve, reject) => {
    fileReader.onerror = () => {
      fileReader.abort();
      reject(new DOMException('Something went wrong reading that file.'));
    };
    fileReader.onload = () => {
      resolve(fileReader.result as ArrayBuffer);
    };
    fileReader.readAsArrayBuffer(blob);
  });
  return loadFile.then(
      (arrayBuffer) => offlineCtx.decodeAudioData(arrayBuffer));
}

export function melSpectrogram(
    y: Float32Array, params: SpecParams): Float32Array[] {
  if (!params.power) {
    params.power = 2.0;
  }
  const stftMatrix = stft(y, params);
  const [spec, nFft] = magSpectrogram(stftMatrix, params.power);

  params.nFft = nFft;
  const melBasis = createMelFilterbank(params);
  return applyWholeFilterbank(spec, melBasis);
}

/**
 * Convert a power spectrogram (amplitude squared) to decibel (dB) units
 *
 * Intended to match {@link
 * https://librosa.github.io/librosa/generated/librosa.core.power_to_db.html
 * librosa.core.power_to_db}
 * @param spec Input power.
 * @param amin Minimum threshold for `abs(S)`.
 * @param topDb Threshold the output at `topDb` below the peak.
 */
export function powerToDb(spec: Float32Array[], amin = 1e-10, topDb = 80.0) {
  const width = spec.length;
  const height = spec[0].length;
  const logSpec = [];
  for (let i = 0; i < width; i++) {
    logSpec[i] = new Float32Array(height);
  }
  for (let i = 0; i < width; i++) {
    for (let j = 0; j < height; j++) {
      const val = spec[i][j];
      logSpec[i][j] = 10.0 * Math.log10(Math.max(amin, val));
    }
  }
  if (topDb) {
    if (topDb < 0) {
      throw new Error(`topDb must be non-negative.`);
    }
    for (let i = 0; i < width; i++) {
      const maxVal = max(logSpec[i]);
      for (let j = 0; j < height; j++) {
        logSpec[i][j] = Math.max(logSpec[i][j], maxVal - topDb);
      }
    }
  }
  return logSpec;
}

function getMonoAudio(audioBuffer: AudioBuffer) {
  if (audioBuffer.numberOfChannels === 1) {
    return audioBuffer.getChannelData(0);
  }
  if (audioBuffer.numberOfChannels !== 2) {
    throw Error(
        `${audioBuffer.numberOfChannels} channel audio is not supported.`);
  }
  const ch0 = audioBuffer.getChannelData(0);
  const ch1 = audioBuffer.getChannelData(1);

  const mono = new Float32Array(audioBuffer.length);
  for (let i = 0; i < audioBuffer.length; ++i) {
    mono[i] = (ch0[i] + ch1[i]) / 2;
  }
  return mono;
}

export async function resampleAndMakeMono(
    audioBuffer: AudioBuffer, targetSr = SAMPLE_RATE) {
  if (audioBuffer.sampleRate === targetSr) {
    return getMonoAudio(audioBuffer);
  }
  const sourceSr = audioBuffer.sampleRate;
  const lengthRes = (audioBuffer.length * targetSr) / sourceSr;
  if (!isSafari) {
    const _offlineCtx = new OfflineAudioContext(
        audioBuffer.numberOfChannels, audioBuffer.duration * targetSr,
        targetSr);
    const bufferSource = _offlineCtx.createBufferSource();
    bufferSource.buffer = audioBuffer;
    bufferSource.connect(_offlineCtx.destination);
    bufferSource.start();
    return _offlineCtx.startRendering().then(
        (buffer: AudioBuffer) => buffer.getChannelData(0));
  } else {
    // Safari does not support resampling with WebAudio.
    logging.log(
        'Safari does not support WebAudio resampling, so this may be slow.',
        'O&F', logging.Level.WARN);

    const originalAudio = getMonoAudio(audioBuffer);
    const resampledAudio = new Float32Array(lengthRes);
    resample(
        ndarray(resampledAudio, [lengthRes]),
        ndarray(originalAudio, [originalAudio.length]));
    return resampledAudio;
  }
}

interface MelParams {
  sampleRate: number;
  nFft?: number;
  nMels?: number;
  fMin?: number;
  fMax?: number;
}

function magSpectrogram(
    stft: Float32Array[], power: number): [Float32Array[], number] {
  const spec = stft.map((fft) => pow(mag(fft), power));
  const nFft = stft[0].length - 1;
  return [spec, nFft];
}

function stft(y: Float32Array, params: SpecParams): Float32Array[] {
  const nFft = params.nFft || 2048;
  const winLength = params.winLength || nFft;
  const hopLength = params.hopLength || Math.floor(winLength / 4);

  let fftWindow = hannWindow(winLength);

  // Pad the window to be the size of nFft.
  fftWindow = padCenterToLength(fftWindow, nFft);

  // Pad the time series so that the frames are centered.
  y = padReflect(y, Math.floor(nFft / 2));

  // Window the time series.
  const yFrames = frame(y, nFft, hopLength);
  // Pre-allocate the STFT matrix.
  const stftMatrix = [];

  const width = yFrames.length;
  const height = nFft + 2;
  for (let i = 0; i < width; i++) {
    // Each column is a Float32Array of size height.
    const col = new Float32Array(height);
    stftMatrix[i] = col;
  }

  for (let i = 0; i < width; i++) {
    // Populate the STFT matrix.
    const winBuffer = applyWindow(yFrames[i], fftWindow);
    const col = fft(winBuffer);
    stftMatrix[i].set(col.slice(0, height));
  }

  return stftMatrix;
}

function applyWholeFilterbank(
    spec: Float32Array[], filterbank: Float32Array[]): Float32Array[] {
  // Apply a point-wise dot product between the array of arrays.
  const out: Float32Array[] = [];
  for (let i = 0; i < spec.length; i++) {
    out[i] = applyFilterbank(spec[i], filterbank);
  }
  return out;
}

function applyFilterbank(
    mags: Float32Array, filterbank: Float32Array[]): Float32Array {
  if (mags.length !== filterbank[0].length) {
    throw new Error(
        `Each entry in filterbank should have dimensions ` +
        `matching FFT. |mags| = ${mags.length}, ` +
        `|filterbank[0]| = ${filterbank[0].length}.`);
  }

  // Apply each filter to the whole FFT signal to get one value.
  const out = new Float32Array(filterbank.length);
  for (let i = 0; i < filterbank.length; i++) {
    // To calculate filterbank energies we multiply each filterbank with the
    // power spectrum.
    const win = applyWindow(mags, filterbank[i]);
    // Then add up the coefficents.
    out[i] = win.reduce((a, b) => a + b);
  }
  return out;
}

export function applyWindow(buffer: Float32Array, win: Float32Array) {
  if (buffer.length !== win.length) {
    console.error(
        `Buffer length ${buffer.length} != window length ${win.length}.`);
    return null;
  }

  const out = new Float32Array(buffer.length);
  for (let i = 0; i < buffer.length; i++) {
    out[i] = win[i] * buffer[i];
  }
  return out;
}

export function padCenterToLength(data: Float32Array, length: number) {
  // If data is longer than length, error!
  if (data.length > length) {
    throw new Error('Data is longer than length.');
  }

  const paddingLeft = Math.floor((length - data.length) / 2);
  const paddingRight = length - data.length - paddingLeft;
  return padConstant(data, [paddingLeft, paddingRight]);
}

export function padConstant(data: Float32Array, padding: number|number[]) {
  let padLeft, padRight;
  if (typeof padding === 'object') {
    [padLeft, padRight] = padding;
  } else {
    padLeft = padRight = padding;
  }
  const out = new Float32Array(data.length + padLeft + padRight);
  out.set(data, padLeft);
  return out;
}

function padReflect(data: Float32Array, padding: number) {
  const out = padConstant(data, padding);
  for (let i = 0; i < padding; i++) {
    // Pad the beginning with reflected values.
    out[i] = out[2 * padding - i];
    // Pad the end with reflected values.
    out[out.length - i - 1] = out[out.length - 2 * padding + i - 1];
  }
  return out;
}

/**
 * Given a timeseries, returns an array of timeseries that are windowed
 * according to the params specified.
 */
export function frame(
    data: Float32Array, frameLength: number,
    hopLength: number): Float32Array[] {
  const bufferCount = Math.floor((data.length - frameLength) / hopLength) + 1;
  const buffers = Array.from(
      {length: bufferCount}, (x, i) => new Float32Array(frameLength));
  for (let i = 0; i < bufferCount; i++) {
    const ind = i * hopLength;
    const buffer = data.slice(ind, ind + frameLength);
    buffers[i].set(buffer);
    // In the end, we will likely have an incomplete buffer, which we should
    // just ignore.
    if (buffer.length !== frameLength) {
      continue;
    }
  }
  return buffers;
}

function createMelFilterbank(params: MelParams): Float32Array[] {
  const fMin = params.fMin || 0;
  const fMax = params.fMax || params.sampleRate / 2;
  const nMels = params.nMels || 128;
  const nFft = params.nFft || 2048;

  // Center freqs of each FFT band.
  const fftFreqs = calculateFftFreqs(params.sampleRate, nFft);
  // (Pseudo) center freqs of each Mel band.
  const melFreqs = calculateMelFreqs(nMels + 2, fMin, fMax);

  const melDiff = internalDiff(melFreqs);
  const ramps = outerSubtract(melFreqs, fftFreqs);
  const filterSize = ramps[0].length;

  const weights = [];
  for (let i = 0; i < nMels; i++) {
    weights[i] = new Float32Array(filterSize);
    for (let j = 0; j < ramps[i].length; j++) {
      const lower = -ramps[i][j] / melDiff[i];
      const upper = ramps[i + 2][j] / melDiff[i + 1];
      const weight = Math.max(0, Math.min(lower, upper));
      weights[i][j] = weight;