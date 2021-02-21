
/**
 * Core implementation for [DDSP]{@link
 * https://g.co/magenta/ddsp} models.
 *
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
 */

/**
 * Imports.
 */
import '@tensorflow/tfjs-backend-webgl';

import * as tf from '@tensorflow/tfjs';
import {Tensor} from '@tensorflow/tfjs';
import * as Tone from 'tone';

import {resampleAndMakeMono} from '../core/audio_utils';
import {upsample_f0} from '../spice/pitch_utils';
import {MODEL_SAMPLE_RATE} from '../spice/spice';

import {addReverb} from './add_reverb';
import {mixAndJoinAudioData} from './audio_utils';
import {arrayBufferToAudioBuffer} from './buffer_utils';
import {CROSSFADE_DURATION, OUTPUT_SAMPLE_RATE} from './constants';
import {convertFrameToSecs, convertSecsToFrame, getModel, memCheck, normalizeAudioFeatures, resizeAudioFeatures,} from './ddsp';
import {AudioFeatures, ModelValues} from './interfaces';

class DDSP {
  private initialized: boolean;
  private checkpointUrl: string;
  private model: tf.GraphModel;
  private settings: ModelValues;

  /**
   * `DDSP` constructor.
   */
  constructor(checkpointUrl: string, settings?: ModelValues) {
    this.checkpointUrl = checkpointUrl;
    if (settings) {
      this.settings = settings;
    }
  }

  /**
   * Loads variables from the checkpoint and builds the model graph.
   */
  async initialize() {
    tf.registerOp('Roll', (node) => {
      const tensors = tf.split(node.inputs[0], 2, 2);
      const result = tf.concat([tensors[1], tensors[0]], 2);