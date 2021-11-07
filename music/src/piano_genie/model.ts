
/**
 * Core implementation for Piano Genie model.
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

import * as tf from '@tensorflow/tfjs';

import {fetch} from '../core/compat/global';
import {logging} from '../core';

/**
 * Constants.
 */
const DATA_TIME_QUANTIZE_RATE = 31.25;
const DATA_MAX_DISCRETE_TIMES = 32;
const RNN_NLAYERS = 2;
const RNN_NUNITS = 128;
const NUM_BUTTONS = 8;
const NUM_PIANOKEYS = 88;

/**
 * A type for keeping track of LSTM state activations.
 *
 * @param c The memory parameters of the LSTM.
 * @param h The hidden state parameters of the LSTM.
 */
type LSTMState = { c: tf.Tensor2D[], h: tf.Tensor2D[] };

/**
 * Creates empty LSTM state.
 */
function createZeroState() {
  const state: LSTMState = { c: [], h: [] };
  for (let i = 0; i < RNN_NLAYERS; ++i) {
    state.c.push(tf.zeros([1, RNN_NUNITS], 'float32'));
    state.h.push(tf.zeros([1, RNN_NUNITS], 'float32'));
  }
  return state;
}

/**
 * Frees LSTM state from GPU memory.
 *
 * @param state: The LSTM state to free.
 */
function disposeState(state: LSTMState) {
  for (let i = 0; i < RNN_NLAYERS; ++i) {
    state.c[i].dispose();
    state.h[i].dispose();
  }
}

/**
 * Samples logits with temperature.
 *
 * @param logits The unnormalized logits to sample from.
 * @param temperature Temperature. From 0 to 1, goes from argmax to random.
 * @param seed Random seed.
 */
function sampleLogits(
  logits: tf.Tensor1D,
  temperature?: number,
  seed?: number) {
  temperature = temperature !== undefined ? temperature : 1.;
  if (temperature < 0. || temperature > 1.) {
    throw new Error('Invalid temperature specified');
  }

  let result: tf.Scalar;

  if (temperature === 0) {
    result = tf.argMax(logits, 0) as tf.Scalar;
  } else {
    if (temperature < 1) {
      logits = tf.div(logits, tf.scalar(temperature, 'float32'));
    }
    const scores = tf.reshape(tf.softmax(logits, 0), [1, -1]) as tf.Tensor2D;
    const sample = tf.multinomial(scores, 1, seed, true) as tf.Tensor1D;
    result = tf.reshape(sample, []) as tf.Scalar;
  }

  return result;
}

/**
 * Piano Genie base class without autoregression.
 */
class PianoGenieBase {
  private checkpointURL: string;
  private initialized: boolean;

  // Model state.
  private modelVars: { [varName: string]: tf.Tensor };
  private decLSTMCells: tf.LSTMCellFunc[];
  private decForgetBias: tf.Scalar;

  // Execution state.
  private lastState: LSTMState;
  private button: number;

  /**
   * Piano Genie constructor.
   *
   * @param checkpointURL Path to the checkpoint directory.
   */
  constructor(checkpointURL: string) {
    this.checkpointURL = checkpointURL;
    this.initialized = false;
  }

  /**
   * Returns whether or not the model has been initialized.
   */
  isInitialized() {
    return this.initialized;
  }

  /**
   * Load model weights.
   *
   * @param staticVars Optional pre-loaded weights for testing.
   */
  async initialize(staticVars?: tf.NamedTensorMap) {
    if (this.initialized) {
      this.dispose();
    }

    if (this.checkpointURL === undefined && staticVars === undefined) {
      throw new Error('Need to specify either URI or static variables');
    }

    if (staticVars === undefined) {
      const vars = await fetch(`${this.checkpointURL}/weights_manifest.json`)
        .then((response) => response.json())
        .then(
          (manifest: tf.io.WeightsManifestConfig) =>
            tf.io.loadWeights(manifest, this.checkpointURL));
      this.modelVars = vars;
    } else {
      this.modelVars = staticVars;
    }

    this.decLSTMCells = [];
    this.decForgetBias = tf.scalar(1, 'float32');
    for (let i = 0; i < RNN_NLAYERS; ++i) {
      const cellPrefix =
        `phero_model/decoder/rnn/rnn/multi_rnn_cell/cell_${i}/lstm_cell/`;

      this.decLSTMCells.push(
        (data: tf.Tensor2D, c: tf.Tensor2D, h: tf.Tensor2D) =>
          tf.basicLSTMCell(
            this.decForgetBias,
            this.modelVars[cellPrefix + 'kernel'] as tf.Tensor2D,
            this.modelVars[cellPrefix + 'bias'] as tf.Tensor1D,
            data, c, h
          ));
    }

    this.resetState();

    this.initialized = true;

    // This runs the model once to force Tensorflow JS to allocate necessary
    // memory. Otherwise the prediction will take a long time when the user
    // presses a button for the first time.
    this.next(0);
    this.resetState();
  }

  /**
   * Gets RNN input features based on current model state.
   */
  protected getRnnInputFeats() {