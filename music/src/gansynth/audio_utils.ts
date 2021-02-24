
/**
 * ISTFT exactly matching python tensorflow.
 *
 * @license
 * Copyright 2019 Google Inc. All Rights Reserved.
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
import * as tf from '@tensorflow/tfjs';
//@ts-ignore
import * as FFT from 'fft.js';

import {applyWindow, hannWindow, padCenterToLength} from '../core/audio_utils';

// tslint:disable-next-line:max-line-length
import {MAG_DESCALE_A, MAG_DESCALE_B, N_FFT, N_HOP, PHASE_DESCALE_A, PHASE_DESCALE_B, SAMPLE_LENGTH, SAMPLE_RATE} from './constants';
import {MEL_SPARSE_COEFFS} from './mel_sparse_coeffs';

export function melToLinearMatrix() {
  const m2l = tf.buffer([1024, 1024]);
  for (let i = 0; i < MEL_SPARSE_COEFFS.length; i++) {
    const x = MEL_SPARSE_COEFFS[i] as number[];
    m2l.set(x[2], x[0], x[1]);
  }
  return m2l.toTensor();
}

function descale(data: tf.Tensor, a: number, b: number) {
  return tf.div(tf.sub(data, b), a);
}

export function melToLinear(melLogPower: tf.Tensor3D) {
  return tf.tidy(() => {
    const m2l = melToLinearMatrix().expandDims(0);
    const melLogPowerDb = descale(melLogPower, MAG_DESCALE_A, MAG_DESCALE_B);
    // Linear scale the magnitude.
    const melPower = tf.exp(melLogPowerDb);
    // Mel to linear frequency scale.
    const powerLin = tf.matMul(melPower, m2l);
    // Power to magnitude.
    const magLin = tf.sqrt(powerLin);
    return magLin;
  });
}

export function ifreqToPhase(ifreq: tf.Tensor) {
  return tf.tidy(() => {
    const m2l = melToLinearMatrix().expandDims(0);
    const ifreqDescale = descale(ifreq, PHASE_DESCALE_A, PHASE_DESCALE_B);
    // Need to multiply phase by -1.0 to account for conjugacy difference
    // between tensorflow and librosa/javascript istft.
    const phase = tf.cumsum(tf.mul(ifreqDescale, Math.PI), 1);
    const phaseLin = tf.matMul(phase, m2l);
    return phaseLin;
  });
}

function interleaveReIm(real: tf.Tensor, imag: tf.Tensor) {
  const reImInterleave = tf.tidy(() => {
    // Combine and add back in the zero DC component
    let reImBatch = tf.concat([real, imag], 0).expandDims(3);
    reImBatch = tf.pad(reImBatch, [[0, 0], [0, 0], [1, 0], [0, 0]]);

    // Interleave real and imaginary for javascript ISTFT.
    // Hack to interleave [re0, im0, re1, im1, ...] with batchToSpace.
    const crops = [[0, 0], [0, 0]];
    const reImInterleave =
        tf.batchToSpaceND(reImBatch, [1, 2], crops).reshape([128, 4096]);
    // Convert Tensor to a Float32Array[]
    return reImInterleave;
  });
  const reImArray = reImInterleave.dataSync();
  const reIm = [] as Float32Array[];
  for (let i = 0; i < 128; i++) {
    reIm[i] = reImArray.slice(i * 4096, (i + 1) * 4096) as Float32Array;
  }
  reImInterleave.dispose();
  return reIm;
}

/**
 * Parameters for computing a inverse spectrogram from audio.
 */
export interface InverseSpecParams {