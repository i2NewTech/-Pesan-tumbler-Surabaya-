/**
 * @license
 * Copyright 2019 Google Inc. All Rights Reserved.
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
import * as tf from '@tensorflow/tfjs';
import * as Tone from 'tone';
import {performance} from '../src/core/compat/global';

import * as mm from '../src/index';

import {CHECKPOINTS_DIR, writeMemory, writeTimer} from './common';

const GANSYNTH_CHECKPOINT = `${CHECKPOINTS_DIR}/gansynth/acoustic_only`;

mm.logging.setVerbosity(mm.logging.Level.DEBUG);

async function plotSpectra(
    spectra: tf.Tensor4D, canvasId: string, channel: number) {
  const spectraPlot = tf.tidy(() => {
    // Slice a single example.
    const spectraSlice = tf.slice(spectra, [0, 0, 0, channel], [
                             1, -1, -1, 1
                           ]).reshape([128, 1024]);
    let spectraPlot = spectraSlice as tf.Tensor3D;
    // Scale to [0, 1].
    spectraPlot = tf.sub(spectraPlot, tf.min(spectraPlot));
    spectraPlot = tf.div(spectraPlot, tf.max(spectraPlot));
    return spectraPlot;
  });
  // Plot on canvas.
  const canvas = document.getElementById(canvasId) as HTMLCanvasElement;
  await tf.browser.toPixels(spectraPlot, canvas);
  spectraPlot.dispose();
}

async function runGANSynth