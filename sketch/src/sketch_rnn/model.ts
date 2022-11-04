
/**
 * Core implementation for RNN-based Magenta sketch models such as SketchRNN.
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
import * as tf from '@tensorflow/tfjs-core';

import * as support from '../core/sketch_support';

/**
 * Interface for JSON specification of a `MusicVAE` model.
 *
 * @property max_seq_len: Model trained on dataset w/ this max sequence length.
 * @property mode: Pre-trained models have this parameter for legacy reasons.
 * 0 for VAE, 1 for Decoder only. This model is Decoder only (not used).
 * @property name: QuickDraw name, like cat, dog, elephant, etc
 * @property scale_factor: the factor to convert from neural-network space to
 * pixel space. Most pre-trained models have this number between 80-120
 * @property version: Pre-trained models have a version between 1-6, for
 * the purpose of experimental research log.
 */
export interface SketchRNNInfo {
  max_seq_len: number;
  mode: number;
  name: string;
  scale_factor: number;
  version: number;
}

/**
 * Interface for specification of the Probability Distribution Function
 * of a pen stroke.
 * 
 * Please refer to "A Neural Representation of Sketch Drawings"
 * https://arxiv.org/abs/1704.03477
 * 
 * In Eq.3 is an explanation of all of these parameters.
 * 
 * Below is a brief description:
 * 
 * @property pi: categorial distribution for mixture of Gaussian
 * @property muX: mean for x-axis
 * @property muY: mean for y-axis
 * @property sigmaX: standard deviation of x-axis
 * @property sigmaY: standard deviation of y-axis
 * @property corr: correlation parameter between x and y
 * @property pen: categorical distribution for the 3 pen states
 */
export interface StrokePDF {
  pi: Float32Array;
  muX: Float32Array;
  muY: Float32Array;
  sigmaX: Float32Array;
  sigmaY: Float32Array;
  corr: Float32Array;
  pen: Float32Array;
}

/**
 * States of the LSTM Cell
 * 
 * Long-Short Term Memory: ftp://ftp.idsia.ch/pub/juergen/lstm.pdf
 * 
 * @property c: memory "cell" of the LSTM.
 * @property h: hidden state (also the output) of the LSTM.
 */
export interface LSTMState {
  c: Float32Array;
  h: Float32Array;
}

/**
 * Main SketchRNN model class.
 *
 * Implementation of decoder model in https://arxiv.org/abs/1704.03477
 * 
 * TODO(hardmaru): make a "batch" continueSequence-like method
 * that runs fully on GPU.
 */
export class SketchRNN {
  private checkpointURL: string;

  private forgetBias: tf.Scalar;

  private initialized: boolean;

  public info: SketchRNNInfo;
  public numUnits: number;

  public pixelFactor: number;
  public scaleFactor: number;

  // raw weights and dimensions directly from JSON
  private weights: Float32Array[];
  private weightDims: number[][];

  // TensorFlow.js weight matrices
  private outputKernel: tf.Tensor2D;
  private outputBias: tf.Tensor1D;
  private lstmKernel: tf.Tensor2D;
  private lstmBias: tf.Tensor1D;

  private rawVars: tf.Tensor[];

  private NMIXTURE = 20;

  /**
   * `SketchRNN` constructor.