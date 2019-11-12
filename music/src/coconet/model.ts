
/**
 * Implementation for [Coconet]{@link
 * https://ismir2017.smcnus.org/wp-content/uploads/2017/10/187_Paper.pdf%7D}
 * models.
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
 * =============================================================================
 */
import * as tf from '@tensorflow/tfjs-core';

import {fetch, performance} from '../core/compat/global';
import * as logging from '../core/logging';
import * as sequences from '../core/sequences';
import {INoteSequence} from '../protobuf/index';

import {IS_IOS, NUM_PITCHES, pianorollToSequence, sequenceToPianoroll} from './coconet_utils';

/**
 * An interface for providing an infilling mask.
 * @param step The quantized time step at which to infill.
 * @param voice The voice to infill at the time step.
 */
interface InfillMask {
  step: number;
  voice: number;
}

/**
 * An interface for providing configurable properties to a Coconet model.
 * @param temperature (Optional) The softmax temperature to use when sampling
 * from the logits. Default is 0.99.
 * @param numIterations (Optional) The number of Gibbs sampling iterations
 * before the final output. Fewer iterations will be faster but have poorer
 * results; more iterations will be slower but have better results.
 * @param infillMask (Optional) Array of timesteps at which the model should
 * infill notes. The array should contain pairs of the form
 * `{step: number, voice: number}`, indicating which voice should be
 * infilled for a particular step. If this value isn't provided, then the model
 * will attempt to infill all the "silent" steps in the input sequence.
 */
interface CoconetConfig {
  temperature?: number;
  numIterations?: number;
  infillMask?: InfillMask[];
}

interface LayerSpec {
  pooling?: number[];
  filters?: number[];
  activation?: string;
  dilation?: number[];
  activeNoteRGB?: string;
  minPitch?: number;
  maxPitch?: number;
  poolPad?: 'same'|'valid';
  convPad?: string;
  convStride?: number;
}

interface ModelSpec {
  useSoftmaxLoss: boolean;
  batchNormVarianceEpsilon: number;
  numInstruments: number;
  numFilters: number;
  numLayers: number;
  numRegularConvLayers: number;
  dilation?: number[][];
  layers: LayerSpec[];
  interleaveSplitEveryNLayers?: number;
  numPointwiseSplits?: number;
}

const DEFAULT_SPEC: ModelSpec = {
  useSoftmaxLoss: true,
  batchNormVarianceEpsilon: 1.0e-07,
  numInstruments: 4,
  numFilters: 128,
  numLayers: 33,
  numRegularConvLayers: 0,
  dilation: [
    [1, 1], [2, 2], [4, 4], [8, 8], [16, 16], [16, 32],
    [1, 1], [2, 2], [4, 4], [8, 8], [16, 16], [16, 32],
    [1, 1], [2, 2], [4, 4], [8, 8], [16, 16], [16, 32],
    [1, 1], [2, 2], [4, 4], [8, 8], [16, 16], [16, 32],
    [1, 1], [2, 2], [4, 4], [8, 8], [16, 16], [16, 32]
  ],
  layers: null,
  interleaveSplitEveryNLayers: 16,
  numPointwiseSplits: 4,
};

class ConvNet {
  private residualPeriod = 2;
  private outputForResidual: tf.Tensor = null;
  private residualCounter = -1;
  private spec: ModelSpec;

  // Save for disposal.
  private rawVars: {[varName: string]: tf.Tensor} = null;

  constructor(spec: ModelSpec, vars: {[varName: string]: tf.Tensor}) {
    this.spec = spec;
    this.rawVars = vars;
  }

  dispose() {
    if (this.rawVars !== null) {
      tf.dispose(this.rawVars);
    }
    if (this.outputForResidual) {
      this.outputForResidual.dispose();
    }
  }

  public predictFromPianoroll(pianoroll: tf.Tensor4D, masks: tf.Tensor4D):
      tf.Tensor {
    return tf.tidy(() => {
      let featuremaps = this.getConvnetInput(pianoroll, masks);

      const n = this.spec.layers.length;
      for (let i = 0; i < n; i++) {
        this.residualCounter += 1;
        this.residualSave(featuremaps);
        let numPointwiseSplits = null;
        if (this.spec.interleaveSplitEveryNLayers && i > 0 && i < n - 2 &&
            i % (this.spec.interleaveSplitEveryNLayers + 1) === 0) {
          numPointwiseSplits = this.spec.numPointwiseSplits;
        }
        featuremaps = this.applyConvolution(
            featuremaps, this.spec.layers[i], i,
            i >= this.spec.numRegularConvLayers, numPointwiseSplits);
        featuremaps = this.applyResidual(featuremaps, i === 0, i === n - 1, i);
        featuremaps = this.applyActivation(featuremaps, this.spec.layers[i], i);
        featuremaps = this.applyPooling(featuremaps, this.spec.layers[i], i);
      }
      return this.computePredictions(featuremaps);
    });
  }

  private computePredictions(logits: tf.Tensor): tf.Tensor {
    if (this.spec.useSoftmaxLoss) {
      return logits.transpose([0, 1, 3, 2]).softmax().transpose([0, 1, 3, 2]);
    }
    return logits.sigmoid();
  }

  private residualReset() {
    this.outputForResidual = null;
    this.residualCounter = 0;
  }

  private residualSave(x: tf.Tensor) {
    if (this.residualCounter % this.residualPeriod === 1) {
      this.outputForResidual = x;
    }
  }

  private applyResidual(
      x: tf.Tensor4D, isFirst: boolean, isLast: boolean,
      i: number): tf.Tensor4D {
    if (this.outputForResidual == null) {
      return x;
    }
    if (this.outputForResidual
            .shape[this.outputForResidual.shape.length - 1] !==
        x.shape[x.shape.length - 1]) {
      this.residualReset();
      return x;
    }
    if (this.residualCounter % this.residualPeriod === 0) {
      if (!isFirst && !isLast) {
        x = x.add(this.outputForResidual);
      }
    }
    return x;
  }

  private getVar(name: string, layerNum: number): tf.Tensor4D {
    const varname = `model/conv${layerNum}/${name}`;
    return this.rawVars[varname] as tf.Tensor4D;
  }

  private getSepConvVar(name: string, layerNum: number): tf.Tensor4D {
    const varname = `model/conv${layerNum}/SeparableConv2d/${name}`;
    return this.rawVars[varname] as tf.Tensor4D;
  }

  private getPointwiseSplitVar(
      name: string, layerNum: number, splitNum: number) {
    // tslint:disable-next-line:max-line-length
    const varname =
        `model/conv${layerNum}/split_${layerNum}_${splitNum}/${name}`;
    return this.rawVars[varname];
  }

  private applyConvolution(
      x: tf.Tensor4D, layer: LayerSpec, i: number, depthwise: boolean,
      numPointwiseSplits?: number): tf.Tensor4D {
    if (layer.filters == null) {
      return x;
    }
    const filterShape = layer.filters;
    const stride = layer.convStride || 1;
    const padding = layer.convPad ?
        layer.convPad.toLowerCase() as 'same' | 'valid' :
        'same';
    let conv = null;
    if (depthwise) {
      const dWeights = this.getSepConvVar('depthwise_weights', i);
      if (!numPointwiseSplits) {
        const pWeights = this.getSepConvVar('pointwise_weights', i);
        const biases = this.getSepConvVar('biases', i);
        const sepConv = tf.separableConv2d(
            x, dWeights, pWeights, [stride, stride], padding,
            (layer.dilation as [number, number]), 'NHWC');
        conv = sepConv.add(biases);
      } else {
        conv = tf.depthwiseConv2d(
            x, dWeights, [stride, stride], padding, 'NHWC',
            (layer.dilation as [number, number]));
        const splits = tf.split(conv, numPointwiseSplits, conv.rank - 1);
        const pointwiseSplits = [];
        for (let splitIdx = 0; splitIdx < numPointwiseSplits; splitIdx++) {
          const outputShape = filterShape[3] / numPointwiseSplits;
          const weights = this.getPointwiseSplitVar('kernel', i, splitIdx);
          const biases = this.getPointwiseSplitVar('bias', i, splitIdx);
          const dot = tf.matMul(
              splits[splitIdx].reshape([-1, outputShape]), weights, false,
              false);
          const bias = tf.add(dot, biases);
          pointwiseSplits.push(bias.reshape([
            splits[splitIdx].shape[0], splits[splitIdx].shape[1],
            splits[splitIdx].shape[2], outputShape
          ]));
        }
        conv = tf.concat(pointwiseSplits, conv.rank - 1);
      }
    } else {
      const weights = this.getVar('weights', i);
      const stride = layer.convStride || 1;
      const padding = layer.convPad ?
          layer.convPad.toLowerCase() as 'same' | 'valid' :
          'same';
      conv = tf.conv2d(x, weights, [stride, stride], padding, 'NHWC', [1, 1]);
    }
    return this.applyBatchnorm(conv as tf.Tensor4D, i) as tf.Tensor4D;
  }

  private applyBatchnorm(x: tf.Tensor4D, i: number): tf.Tensor {
    const gammas = this.getVar('gamma', i);
    const betas = this.getVar('beta', i);
    const mean = this.getVar('popmean', i);
    const variance = this.getVar('popvariance', i);
    if (IS_IOS) {
      // iOS WebGL floats are 16-bit, and the variance is outside this range.
      // This loads the variance to 32-bit floats in JS to compute batchnorm.
      // This arraySync is OK because we don't use the variance anywhere,
      // so it doesn't actually get uploaded to the GPU, so we don't
      // continuously download it and upload it which is the problem with
      // dataSync.
      const v = variance.arraySync()[0][0][0];
      const stdevs = tf.tensor(v.map(
          (x: number) => Math.sqrt(x + this.spec.batchNormVarianceEpsilon)));
      return x.sub(mean).mul(gammas.div(stdevs)).add(betas);
    }
    return tf.batchNorm(
        x, tf.squeeze(mean), tf.squeeze(variance), tf.squeeze(betas),
        tf.squeeze(gammas), this.spec.batchNormVarianceEpsilon);
  }

  private applyActivation(x: tf.Tensor4D, layer: LayerSpec, i: number):
      tf.Tensor4D {
    if (layer.activation === 'identity') {
      return x;
    }
    return x.relu();
  }

  private applyPooling(x: tf.Tensor4D, layer: LayerSpec, i: number):
      tf.Tensor4D {
    if (layer.pooling == null) {
      return x;
    }
    const pooling = layer.pooling;
    const padding = layer.poolPad ?
        layer.poolPad.toLowerCase() as 'same' | 'valid' :
        'same';
    return tf.maxPool(
        x, [pooling[0], pooling[1]], [pooling[0], pooling[1]], padding);