/**
 * @license
 * Copyright 2020 Google Inc. All Rights Reserved.
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
 * =============================================================================
 */

import * as tf from '@tensorflow/tfjs';
import {Tensor} from '@tensorflow/tfjs';

import {midiToHz} from '../core/audio_utils';
import {AudioData} from '../ddsp/interfaces';

import {CONF_THRESHOLD, PITCH_CONF_JITTER, PT_OFFSET, PT_SLOPE,} from './spice';

function shiftF0(f0Hz: number[], f0OctaveShift = 0.0) {
  return tf.tidy(() => {
    let tempF0 = tf.mul(f0Hz, tf.pow(2, f0OctaveShift));
    tempF0 = tempF0.clipByValue(0.0, midiToHz(110.0).dataSync()[0]);
    return tempF0;
  });
}

function upsample_linear(buffer: number[], newSampleRateLength: number) {
  const pitchedInput = [];
  const dupCountPitches = Math.floor(newSampleRateLength / buffer.length);
  const modulos = newSampleRateLength % buffer.length;

  for (let i = 0; i < buffer.length; i++) {
    pitchedInput.push(buffer[i]);
    for (let j = 1; j < dupCountPitches; j++) {
      pitchedInput.push(-1);
    }
    if (i < modulos) {
      pitchedInput.push(-1);
    }
  }

  // Cover missing pitches.
  let lastPitch = -1;
  for (let i = 0; i < pitchedInput.length; i++) {
    if (pitchedInput[i] !== -1) {
      let dif: number = pitchedInput[i];
     