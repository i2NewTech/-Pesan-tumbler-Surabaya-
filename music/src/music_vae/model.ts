/**
 * Core implementation for [MusicVAE]{@link https://g.co/magenta/musicvae}
 * models.
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

/**
 * Imports
 */
import * as tf from '@tensorflow/tfjs';

import * as chords from '../core/chords';
import {fetch, performance} from '../core/compat/global';
import * as constants from '../core/constants';
import * as data from '../core/data';
import * as logging from '../core/logging';
import {INoteSequence} from '../protobuf/index';

/**
 * A class for keeping track of the parameters of an affine transformation.
 *
 * @param kernel A 2-dimensional tensor with the kernel parameters.
 * @param bias A 1-dimensional tensor with the bias parameters.
 */
class LayerVars {
  kernel: tf.Tensor2D;
  bias: tf.Tensor1D;
  constructor(kernel: tf.Tensor2D, bias: tf.Tensor1D) {
    if (kernel === undefined) {
      throw Error('`kernel` is undefined.');
    }
    if (bias === undefined) {
      throw Error('`bias` is undefined.');
    }
    this.kernel = kernel;
    this.bias = bias;
  }
}

/**
 * Helper function to compute an affine transformation.
 *
 * @param vars `LayerVars` containing the `kernel` and `bias` of the
 * transformation.
 * @param inputs A batch of input vectors to transform.
 * @hidden
 */
function dense(vars: LayerVars, inputs: tf.Tensor2D): tf.Tensor2D {
  return inputs.matMul(vars.kernel).add(vars.bias);
}

/**
 * Abstract Encoder class.
 */
abstract class Encoder {
  abstract readonly zDims: number;
  abstract encode(sequence: tf.Tensor3D, segmentLengths?: number[]):
      tf.Tensor2D;
}

/**
 * A single-layer bidirectional LSTM module.
 */
class BidirectionalLstm {
  private lstmFwVars: LayerVars;
  private lstmBwVars: LayerVars;

  /**
   * `BidirectionalLstm` contructor.
   *
   * @param lstmFwVars The forward LSTM `LayerVars`.
   * @param lstmBwVars The backward LSTM `LayerVars`.
   */
  constructor(lstmFwVars: LayerVars, lstmBwVars: LayerVars) {
    this.lstmFwVars = lstmFwVars;
    this.lstmBwVars = lstmBwVars;
  }

  /**
   * Processes a batch of sequences.
   * @param sequence The batch of sequences to be processed.
   * @returns A batch of forward and backward output (h) LSTM states.
   */
  process(sequence: tf.Tensor3D): [tf.Tensor2D[], tf.Tensor2D[]] {
    return tf.tidy(() => {
      const fwStates = this.singleDirection(sequence, true);
      const bwStates = this.singleDirection(sequence, false);
      return [fwStates, bwStates];
    });
  }

  private singleDirection(inputs: tf.Tensor3D, fw: boolean) {
    const batchSize = inputs.shape[0];
    const length = inputs.shape[1];

    const lstmVars = fw ? this.lstmFwVars : this.lstmBwVars;
    let state: [tf.Tensor2D, tf.Tensor2D] = [
      tf.zeros([batchSize, lstmVars.bias.shape[0] / 4]),
      tf.zeros([batchSize, lstmVars.bias.shape[0] / 4])
    ];
    const forgetBias = tf.scalar(1.0);
    const lstm = (data: tf.Tensor2D, state: [tf.Tensor2D, tf.Tensor2D]) =>
        tf.basicLSTMCell(
            forgetBias, lstmVars.kernel, lstmVars.bias, data, state[0],
            state[1]);
    const splitInputs = tf.split(inputs.toFloat(), length, 1);
    const outputStates: tf.Tensor2D[] = [];
    for (const data of (fw ? splitInputs : splitInputs.reverse())) {
      // Apply LSTM and store output (h) state.
      state = lstm(data.squeeze([1]) as tf.Tensor2D, state);
      outputStates.push(state[1]);
    }
    // Return the output (h) states in chronological order.
    return fw ? outputStates : outputStates.reverse();
  }
}

/**
 * A single-layer bidirectional LSTM encoder.
 */
class BidirectionalLstmEncoder extends Encoder {
  private bidirectionalLstm: BidirectionalLstm;
  private muVars: LayerVars;
  readonly zDims: number;

  /**
   * `BidirectionalLstmEncoder` contructor.
   *
   * @param lstmFwVars The forward LSTM `LayerVars`.
   * @param lstmBwVars The backward LSTM `LayerVars`.
   * @param muVars (Optional) The `LayerVars` for projecting from the final
   * states of the bidirectional LSTM to the mean `mu` of the random variable,
   * `z`. The final states are returned directly if not provided.
   */
  constructor(
      lstmFwVars: LayerVars, lstmBwVars: LayerVars, muVars?: LayerVars) {
    super();
    this.bidirectionalLstm = new BidirectionalLstm(lstmFwVars, lstmBwVars);
    this.muVars = muVars;
    this.zDims = muVars ? this.muVars.bias.shape[0] : null;
  }

  /**
   * Encodes a batch of sequences.
   * @param sequence The batch of sequences to be encoded.
   * @param segmentLengths Unused for this encoder.
   * @returns A batch of concatenated final LSTM states, or the `mu` if `muVars`
   * is known.
   */
  encode(sequence: tf.Tensor3D, segmentLengths?: number[]) {
    if (segmentLengths) {
      throw n