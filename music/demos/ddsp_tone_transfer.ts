/**
 * @license
 * Copyright 2020 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import {AudioFeatures, ModelValues} from '../src/ddsp/interfaces';
import * as mm from '../src/index';
import {SPICE} from '../src/index';

enum MODEL {
  VIOLIN = 'violin',
  TENOR_SAXOPHONE = 'tenor_saxophone',
  TRUMPET = 'trumpet',
  FLUTE = 'flute',
}

const PRESET_MODEL_URL =
    'https://storage.googleapis.com/magentadata/js/checkpoints/ddsp';

function floatTo16BitPCM(
    output: DataView, offset: number, input: Float32Array) {
  for (let i = 0; i < input.length; i++, offset += 2) {
    const s = Math.max(-1, Math.min(1, input[i]));
    output.setInt16(offset, s < 0 ? s * 0x8000 : s * 0x7fff, true);
  }
}

function writeString(view: DataView, offset: number, str: string) {
  for (let i = 0; i < str.length; i++) {
    view.setUint8(offset + i, str.charCodeAt(i));
  }
}

function encodeWAV(samples: Float32Array, sampleRate: number) {
  const buffer = new ArrayBuffer(44 + samples.length * 2);
  const view = new DataView(buffer);

  const channels = 1;

  /* RIFF identifier */
  writeString(view, 0, 'RIFF');
  /* RIFF chunk length */
  view.setUint32(4, 36 + samples.length * 2, true);
  /* RIFF type */
  writeString(view, 8, 'WAVE');
  /* format chunk identifier */
  writeString(view, 12, 'fmt ');
  /* format chunk length */
  view.setUint32(16, 16, true);
  /* sample format (raw) */
  view.setUint16(20, 1, true);
  /* channel count */
  view.setUint16(22, channels, true);
  /* sample rate */
  view.setUint32(24, sampleRate, true);
  /* byte rate (sample rate * block align) */
  view.setUint32(28, sampleRate * 4, true);
  /* block align (channel count * bytes per sample) */
  view.setUint16(32, channels * 2, true);
  /* bits per sample */
  view.setUint16(34, 16, true);
  /* data chunk identifier */
  writeString(view, 36, 'data');
  /* data chunk length */
  view.setUint32(40, samples.length * 2, true);

  floatTo16BitPCM(view, 44, samples);

  return view;
}

window.onload = () => {
  let audioCtx: AudioContext, audioFeatures: AudioFeatures, spice: SPICE;

  document.getElementById('initialize').addEventListener('click', async () => {
    spice = new mm.SPICE();
    document.getElementById('initialize').style.display = 'none';
    document.getElementById('spice_initialized').textContent =
        'Loading SPICE model.';
    await spice.initialize();
    document.getElementById('spice_initialized').textContent =
        'SPICE model is ready.';
    audioCtx = new AudioContext();
    document.getElementById('extract_features').style.display = 'block';
  });

  document.getElementById('upload').addEventListener(
      'change', handleFileUpload);

  async function readFileAndProcessAudio(src: string) {
    const audioFile = await fetch(src);
    const arrayBuffer = await audioFile.arrayBuffer();
    const audioBuffer = await audioCtx.decodeAudioData(arrayBuffer);
    audioFeatures = await spice.getAudioFeatures(audioBuffer);
    printJSONObj('audio_features', audioFeatures);
    displayButtons();
  }

  function displayButtons() {
    docum