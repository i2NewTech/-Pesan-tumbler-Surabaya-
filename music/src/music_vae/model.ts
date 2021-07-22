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
      throw new Error('Variable-length segments not supported in flat encoder');
    }

    return tf.tidy(() => {
      const [fwStates, bwStates] = this.bidirectionalLstm.process(sequence);
      const finalState =
          tf.concat([fwStates[fwStates.length - 1], bwStates[0]], 1);
      if (this.muVars) {
        return dense(this.muVars, finalState);
      } else {
        return finalState;
      }
    });
  }
}

/**
 * A hierarchical encoder that uses the outputs from each level as the inputs
 * to the subsequent level.
 */
class HierarchicalEncoder extends Encoder {
  private baseEncoders: Encoder[];
  private numSteps: number[];
  private muVars: LayerVars;
  readonly zDims: number;

  /**
   * `HierarchicalEncoder` contructor.
   *
   * @param baseEncoders An list of `Encoder` objects to use for each.
   * @param numSteps A list containing the number of steps (outputs) for each
   * level of the hierarchy. This number should evenly divide the inputs for
   * each level. The final entry must always be `1`.
   * @param muVars The `LayerVars` for projecting from the final
   * states of the final level to the mean `mu` of the random variable, `z`.
   */
  constructor(baseEncoders: Encoder[], numSteps: number[], muVars: LayerVars) {
    super();
    this.baseEncoders = baseEncoders;
    this.numSteps = numSteps;
    this.muVars = muVars;
    this.zDims = this.muVars.bias.shape[0];
  }

  /**
   * Encodes a batch of sequences.
   * @param sequence The batch of sequences to be encoded.
   * @param segmentLengths (Optional) An array of lengths of the base-level
   * segments. Must have length `numSteps[0]`. Assumes that batch size is 1.
   * @returns A batch of `mu` values.
   */
  encode(sequence: tf.Tensor3D, segmentLengths?: number[]) {
    if (segmentLengths) {
      if (sequence.shape[0] !== 1) {
        throw new Error(
            'When using variable-length segments, batch size must be 1.');
      }
      if (segmentLengths.length !== this.numSteps[0]) {
        throw new Error(
            'Must provide length for all variable-length segments.');
      }
    }

    return tf.tidy(() => {
      let inputs: tf.Tensor3D = sequence;

      for (let level = 0; level < this.baseEncoders.length; ++level) {
        const levelSteps = this.numSteps[level];
        const splitInputs: tf.Tensor3D[] = tf.split(inputs, levelSteps, 1);
        const embeddings: tf.Tensor2D[] = [];
        for (let step = 0; step < levelSteps; ++step) {
          embeddings.push(this.baseEncoders[level].encode(
              (level === 0 && segmentLengths) ?
                  tf.slice3d(
                      splitInputs[step], [0, 0, 0],
                      [1, segmentLengths[step], -1]) :
                  splitInputs[step] as tf.Tensor3D));
        }
        inputs = tf.stack(embeddings, 1) as tf.Tensor3D;
      }
      return dense(this.muVars, inputs.squeeze([1]));
    });
  }
}

/**
 * Helper function to create LSTM cells and initial states for decoders.
 *
 * @param z A batch of latent vectors to decode, sized `[batchSize, zDims]`.   *
 * @param lstmCellVars The `LayerVars` for each layer of the decoder LSTM.
 * @param zToInitStateVars The `LayerVars` for projecting from the latent
 * variable `z` to the initial states of the LSTM layers.
 * @returns An Object containing the LSTM cells and initial states.
 * @hidden
 */
function initLstmCells(
    z: tf.Tensor2D, lstmCellVars: LayerVars[], zToInitStateVars: LayerVars) {
  const lstmCells: tf.LSTMCellFunc[] = [];
  const c: tf.Tensor2D[] = [];
  const h: tf.Tensor2D[] = [];
  const initialStates: tf.Tensor2D[] =
      tf.split(dense(zToInitStateVars, z).tanh(), 2 * lstmCellVars.length, 1);
  for (let i = 0; i < lstmCellVars.length; ++i) {
    const lv = lstmCellVars[i];
    const forgetBias = tf.scalar(1.0);
    lstmCells.push(
        (data: tf.Tensor2D, c: tf.Tensor2D, h: tf.Tensor2D) =>
            tf.basicLSTMCell(forgetBias, lv.kernel, lv.bias, data, c, h));
    c.push(initialStates[i * 2]);
    h.push(initialStates[i * 2 + 1]);
  }
  return {'cell': lstmCells, 'c': c, 'h': h};
}

/**
 * Abstract Decoder class.
 */
abstract class Decoder {
  abstract readonly outputDims: number;
  abstract readonly zDims: number;

  abstract decode(
      z: tf.Tensor2D, length: number, initialInput?: tf.Tensor2D,
      temperature?: number, controls?: tf.Tensor2D): tf.Tensor3D;
}

/**
 * Abstract base LSTM decoder that implements all functionality except sampler.
 */
abstract class BaseDecoder extends Decoder {
  protected lstmCellVars: LayerVars[];
  protected zToInitStateVars: LayerVars;
  protected outputProjectVars: LayerVars;
  readonly zDims: number;
  readonly outputDims: number;
  readonly controlBidirectionalLstm?: BidirectionalLstm;

  /**
   * `BaseDecoder` contructor.
   *
   * @param lstmCellVars The `LayerVars` for each layer of the decoder LSTM.
   * @param zToInitStateVars The `LayerVars` for projecting from the latent
   * variable `z` to the initial states of the LSTM layers.
   * @param outputProjectVars The `LayerVars` for projecting from the output
   * of the LSTM to the logits of the output categorical distrubtion
   * (if `nade` is null) or to bias values to use in the NADE (if `nade` is
   * not null).
   * @param nade (optional) A `Nade` to use for computing the output vectors at
   * each step. If not given, the final projection values are used as logits
   * for a categorical distribution.
   * @param controlLstmFwVars (optional) The `LayerVars` for the forward
   * direction of a bidirectional LSTM used to process the control tensors.
   * @param controlLstmBwVars (optional) The `LayerVars` for the backward
   * direction of a bidirectional LSTM used to process the control tensors.
   */
  constructor(
      lstmCellVars: LayerVars[], zToInitStateVars: LayerVars,
      outputProjectVars: LayerVars, outputDims?: number,
      controlLstmFwVars?: LayerVars, controlLstmBwVars?: LayerVars) {
    super();
    this.lstmCellVars = lstmCellVars;
    this.zToInitStateVars = zToInitStateVars;
    this.outputProjectVars = outputProjectVars;
    this.zDims = this.zToInitStateVars.kernel.shape[0];
    this.outputDims = outputDims || outputProjectVars.bias.shape[0];
    if (controlLstmFwVars && controlLstmBwVars) {
      this.controlBidirectionalLstm =
          new BidirectionalLstm(controlLstmFwVars, controlLstmBwVars);
    }
  }

  /**
   * Method that returns the sample based on the projected output from the LSTM.
   *
   * @param lstmOutput The projected output from the LSTM.
   * @param temperature Softmax temperature.
   * @returns The sampled output.
   */
  protected abstract sample(lstmOutput: tf.Tensor2D, temperature?: number):
      tf.Tensor2D;

  /**
   * Decodes a batch of latent vectors, `z`.
   *
   * If `nade` is parameterized, samples are generated using the MAP (argmax) of
   * the Bernoulli random variables from the NADE, and these bit vector makes up
   * the final dimension of the output.
   *
   * If `nade` is not parameterized, sample labels are generated using the
   * MAP (argmax) of the logits output by the LSTM, and the onehots of those
   * labels makes up the final dimension of the output.
   *
   * @param z A batch of latent vectors to decode, sized `[batchSize, zDims]`.
   * @param length The length of decoded sequences.
   * @param temperature (Optional) The softmax temperature to use when sampling
   * from the logits. Argmax is used if not provided.
   * @param controls (Optional) Control tensors to use for conditioning, sized
   * `[length, controlDepth]`.
   *
   * @returns A float32 tensor containing the decoded sequences, shaped
   * `[batchSize, length, depth]`.
   */
  decode(
      z: tf.Tensor2D, length: number, initialInput?: tf.Tensor2D,
      temperature?: number, controls?: tf.Tensor2D) {
    const batchSize = z.shape[0];

    return tf.tidy(() => {
      // Initialize LSTMCells.
      const lstmCell =
          initLstmCells(z, this.lstmCellVars, this.zToInitStateVars);

      // Add batch dimension to controls.
      let expandedControls: tf.Tensor3D =
          controls ? tf.expandDims(controls, 0) : undefined;

      // Generate samples.
      const samples: tf.Tensor2D[] = [];
      let nextInput = initialInput ?
          initialInput :
          tf.zeros([batchSize, this.outputDims]) as tf.Tensor2D;
      if (this.controlBidirectionalLstm) {
        // Preprocess the controls with a bidirectional LSTM.
        const [fwStates, bwStates] =
            this.controlBidirectionalLstm.process(expandedControls);
        expandedControls =
            tf.concat([tf.stack(fwStates, 1), tf.stack(bwStates, 1)], 2) as
            tf.Tensor3D;
      }
      const splitControls = expandedControls ?
          tf.split(
              tf.tile(expandedControls, [batchSize, 1, 1]), controls.shape[0],
              1) :
          undefined;
      for (let i = 0; i < length; ++i) {
        const toConcat = splitControls ?
            [nextInput, z, tf.squeeze(splitControls[i], [1]) as tf.Tensor2D] :
            [nextInput, z];
        [lstmCell.c, lstmCell.h] = tf.multiRNNCell(
            lstmCell.cell, tf.concat(toConcat, 1), lstmCell.c, lstmCell.h);
        const lstmOutput =
            dense(this.outputProjectVars, lstmCell.h[lstmCell.h.length - 1]);
        nextInput = this.sample(lstmOutput, temperature);
        samples.push(nextInput);
      }

      return tf.stack(samples, 1) as tf.Tensor3D;
    });
  }
}

/**
 * Decoder that samples from a Bernoulli distributon. Unlike a NADE, each output
 * dimension is sampled independently.
 *
 * Uses a probability threshold of 0.5 if no temperature is provided.
 */
class BooleanDecoder extends BaseDecoder {
  sample(lstmOutput: tf.Tensor2D, temperature?: number): tf.Tensor2D {
    const logits = lstmOutput;
    return (temperature ?
                tf.greaterEqual(
                    tf.sigmoid(
                        logits.div(tf.scalar(temperature)) as tf.Tensor2D),
                    tf.randomUniform(logits.shape)) :
                tf.greaterEqual(logits, 0))
               .toFloat() as tf.Tensor2D;
  }
}

/**
 * Decoder that samples from a Categorical distributon.
 *
 * Uses argmax if no temperature is provided.
 */
class CategoricalDecoder extends BaseDecoder {
  sample(lstmOutput: tf.Tensor2D, temperature?: number): tf.Tensor2D {
    const logits = lstmOutput;
    const timeLabels =
        (temperature ?
             tf.multinomial(
                   logits.div(tf.scalar(temperature)) as tf.Tensor2D, 1)
                 .as1D() :
             logits.argMax(1).as1D());
    return tf.oneHot(timeLabels, this.outputDims).toFloat() as tf.Tensor2D;
  }
}

/**
 * Decoder that samples from a NADE.
 *
 * Ignores the temperature, always selects the argmax.
 */
class NadeDecoder extends BaseDecoder {
  private nade: Nade;

  constructor(
      lstmCellVars: LayerVars[], zToInitStateVars: LayerVars,
      outputProjectVars: LayerVars, nade: Nade, controlLstmFwVars?: LayerVars,
      controlLstmBwVars?: LayerVars) {
    super(
        lstmCellVars, zToInitStateVars, outputProjectVars, nade.numDims,
        controlLstmFwVars, controlLstmBwVars);
    this.nade = nade;
  }

  sample(lstmOutput: tf.Tensor2D, temperature?: number): tf.Tensor2D {
    const [encBias, decBias] =
        tf.split(lstmOutput, [this.nade.numHidden, this.nade.numDims], 1);
    return this.nade.sample(encBias as tf.Tensor2D, decBias as tf.Tensor2D);
  }
}

/**
 * Decoder that samples a "groove".
 *
 * Uses argmax if no temperature is provided.
 */
class GrooveDecoder extends BaseDecoder {
  sample(lstmOutput: tf.Tensor2D, temperature?: number): tf.Tensor2D {
    let [hits, velocities, offsets] = tf.split(lstmOutput, 3, 1);

    velocities = tf.sigmoid(velocities);
    offsets = tf.tanh(offsets);
    if (temperature) {
      hits = tf.sigmoid(hits.div(tf.scalar(temperature))) as tf.Tensor2D;
      const threshold = tf.randomUniform(hits.shape, 0, 1);
      hits = tf.greater(hits, threshold).toFloat() as tf.Tensor2D;
    } else {
      hits = tf.greater(tf.sigmoid(hits), 0.5).toFloat() as tf.Tensor2D;
    }

    return tf.concat([hits, velocities, offsets], 1);
  }
}

/**
 * Split decoder that concatenates the outputs from its component decoders
 * depth-wise.
 */
class SplitDecoder extends Decoder {
  private coreDecoders: Decoder[];
  readonly numDecoders: number;
  readonly zDims: number;
  readonly outputDims: number;

  /**
   * `SplitDecoder` contructor.
   * @param coreDecoders Lower-level `Decoder` objects, each of which gets the
   * same `z`.
   */
  constructor(coreDecoders: Decoder[]) {
    super();
    this.coreDecoders = coreDecoders;
    this.numDecoders = this.coreDecoders.length;
    this.zDims = this.coreDecoders[0].zDims;
    this.outputDims =
        this.coreDecoders.reduce((dims, dec) => dims + dec.outputDims, 0);
  }

  decodeSeparately(
      z: tf.Tensor2D, length: number, initialInput?: tf.Tensor2D[],
      temperature?: number, controls?: tf.Tensor2D): tf.Tensor3D[] {
    const samples: tf.Tensor3D[] = [];
    for (let i = 0; i < this.coreDecoders.length; ++i) {
      samples.push(this.coreDecoders[i].decode(
          z, length, initialInput[i], temperature, controls));
    }
    return samples;
  }

  /**
   * Decodes a batch of latent vectors, `z`.
   *
   * @param z A batch of latent vectors to decode, sized `[batchSize, zDims]`.
   * @param length The length of decoded sequences.
   * @param temperature (Optional) The softmax temperature to use when
   * sampling from the logits. Argmax is used if not provided.
   * @param controls (Optional) Control tensors to use for conditioning, sized
   * `[length, controlDepth]`.
   *
   * @returns A boolean tensor containing the decoded sequences, shaped
   * `[batchSize, length, depth]`.
   */
  decode(
      z: tf.Tensor2D, length: number, initialInput?: tf.Tensor2D,
      temperature?: number, controls?: tf.Tensor2D) {
    return tf.tidy(() => {
      const samples: tf.Tensor3D[] = this.decodeSeparately(
          z, length, this.coreDecoders.map(_ => initialInput), temperature,
          controls);
      return tf.concat(samples, -1);
    });
  }
}

/**
 * Hierarchical decoder that produces intermediate embeddings to pass to
 * lower-level `Decoder` objects. The outputs from different decoders are
 * concatenated depth-wise (axis 3), and the outputs from different steps of
 * the conductor are concatenated across time (axis 1).
 */
class ConductorDecoder extends Decoder {
  private splitDecoder: SplitDecoder;
  private lstmCellVars: LayerVars[];
  private zToInitStateVars: LayerVars;
  readonly numSteps: number;
  readonly zDims: number;
  readonly outputDims: number;

  /**
   * `Decoder` contructor.
   * @param coreDecoders Lower-level `Decoder` objects to pass the conductor
   * LSTM output embeddings to for further decoding.
   * @param lstmCellVars The `LayerVars` for each layer of the conductor LSTM.
   * @param zToInitStateVars The `LayerVars` for projecting from the latent
   * variable `z` to the initial states of the conductor LSTM layers.
   * @param numSteps The number of embeddings the conductor LSTM should
   * produce and pass to the lower-level decoder.
   */
  constructor(
      coreDecoders: Decoder[], lstmCellVars: LayerVars[],
      zToInitStateVars: LayerVars, numSteps: number) {
    super();
    this.splitDecoder = new SplitDecoder(coreDecoders);
    this.lstmCellVars = lstmCellVars;
    this.zToInitStateVars = zToInitStateVars;
    this.numSteps = numSteps;
    this.zDims = this.zToInitStateVars.kernel.shape[0];
    this.outputDims = this.splitDecoder.outputDims;
  }

  /**
   * Hierarchically decodes a batch of latent vectors, `z`.
   *
   * @param z A batch of latent vectors to decode, sized `[batchSize, zDims]`.
   * @param length The length of decoded sequences.
   * @param temperature (Optional) The softmax temperature to use when
   * sampling from the logits. Argmax is used if not provided.
   * @param controls (Optional) Control tensors to use for conditioning, sized
   * `[length, controlDepth]`.
   *
   * @returns A boolean tensor containing the decoded sequences, shaped
   * `[batchSize, length, depth]`.
   */
  decode(
      z: tf.Tensor2D, length: number, initialInput?: tf.Tensor2D,
      temperature?: number, controls?: tf.Tensor2D) {
    const batchSize = z.shape[0];

    return tf.tidy(() => {
      // Initialize LSTMCells.
      const lstmCell =
          initLstmCells(z, this.lstmCellVars, this.zToInitStateVars);

      // Generate embeddings.
      const samples: tf.Tensor3D[] = [];
      let initialInput: tf.Tensor2D[] =
          new Array(this.splitDecoder.numDecoders).fill(undefined);
      const dummyInput: tf.Tensor2D = tf.zeros([batchSize, 1]);
      const splitControls: tf.Tensor2D[] | undefined =
          controls ? tf.split(controls, this.numSteps) : undefined;
      for (let i = 0; i < this.numSteps; ++i) {
        [lstmCell.c, lstmCell.h] =
            tf.multiRNNCell(lstmCell.cell, dummyInput, lstmCell.c, lstmCell.h);
        const currSamples = this.splitDecoder.decodeSeparately(
            lstmCell.h[lstmCell.h.length - 1], length / this.numSteps,
            initialInput, temperature,
            splitControls ? splitControls[i] : undefined);
        samples.push(tf.concat(currSamples, -1));
        initialInput = currSamples.map(
            s => s.slice(
                      [0, s.shape[1] - 1, 0],
                      [batchSize, 1, s.shape[s.rank - 1]])
                     .squeeze([1])
                     .toFloat() as tf.Tensor2D);
      }
      return tf.concat(samples, 1);
    });
  }
}

/**
 * A Neural Autoregressive Distribution Estimator (NADE).
 */
class Nade {
  encWeights: tf.Tensor2D;
  decWeightsT: tf.Tensor2D;
  numDims: number;
  numHidden: number;

  /**
   * `Nade` contructor.
   *
   * @param encWeights The encoder weights (kernel), sized
   * `[numDims, numHidden, 1]`.
   * @param decWeightsT The transposed decoder weights (kernel), sized
   * `[numDims, numHidden, 1]`.
   */
  constructor(encWeights: tf.Tensor3D, decWeightsT: tf.Tensor3D) {
    this.numDims = encWeights.shape[0];
    this.numHidden = encWeights.shape[2];

    this.encWeights = encWeights.as2D(this.numDims, this.numHidden);
    this.decWeightsT = decWeightsT.as2D(this.numDims, this.numHidden);
  }

  /**
   * Samples from the NADE given a batch of encoder and decoder biases.
   *
   * Selects the MAP (argmax) of each Bernoulli random variable.
   *
   * @param encBias A batch of biases to use when encoding, sized
   * `[batchSize, numHidden]`.
   * @param decBias A batch of biases to use when decoding, sized
   * `[batchSize, numDims]`.
   */
  sample(encBias: tf.Tensor2D, decBias: tf.Tensor2D): tf.Tensor2D {
    const batchSize = encBias.shape[0];
    return tf.tidy(() => {
      const samples: tf.Tensor1D[] = [];
      let a = encBias.clone();

      for (let i = 0; i < this.numDims; i++) {
        const h = tf.sigmoid(a);
        const encWeightsI =
            this.encWeights.slice([i, 0], [1, this.numHidden]).as1D();
        const decWeightsTI =
            this.decWeightsT.slice([i, 0], [1, this.numHidden]);
        const decBiasI = decBias.slice([0, i], [batchSize, 1]);
        const contfogitsI =
            decBiasI.add(tf.matMul(h, decWeightsTI, false, true));
        const condProbsI = contfogitsI.sigmoid();

        const samplesI =
            condProbsI.greaterEqual(tf.scalar(0.5)).toFloat().as1D();
        if (i < this.numDims - 1) {
          a = a.add(tf.outerProduct(samplesI.toFloat(), encWeightsI));
        }

        samples.push(samplesI);
      }
      return tf.stack(samples, 1) as tf.Tensor2D;
    });
  }
}

/**
 * Interface for JSON specification of a `MusicVAE` control signal (other than
 * chords and key).
 *
 * @property name Name of the control signal.
 * @property depth Expected depth of the control signal tensors.
 */
export interface MusicVAEControlSpec {
  name: string;
  depth: number;
}

/**
 * Interface for JSON specification of a `MusicVAE` model.
 *
 * @property type The type of the model, `MusicVAE`.
 * @property dataConverter: A `DataConverterSpec` specifying the data
 * converter to use.
 * @property useBooleanDecoder: If true, use a `BooleanDecoder` instead of a
 * `CategoricalDecoder`.
 * @property chordEncoder: (Optional) Type of chord encoder to use when
 * conditioning on chords.
 * @property conditionOnKey: If true, model is key-conditioned.
 * @property extraControls: (Optional) List of extra control signal names and
 * depths.
 */
export interface MusicVAESpec {
  type: 'MusicVAE';
  dataConverter: data.ConverterSpec;
  useBooleanDecoder: boolean;
  chordEncoder?: chords.ChordEncoderType;
  conditionOnKey: boolean;
  extraControls?: MusicVAEControlSpec[];
}

/**
 * Interface for conditioning arguments to MusicVAE functions.
 *
 * @property chordProgression (Optional) Chord progression, an array of chord
 * symbol strings like "Cmaj7", "Abdim", "C#m7", etc.
 * @property key (Optional) Key, an integer between 0 (C major / A minor) and 11
 * (B major / G# minor).
 * @property extraControls (Optional) Additional named control tensors.
 */
export interface MusicVAEControlArgs {
  chordProgression?: string[];
  key?: number;
  extraControls?: {[name: string]: tf.Tensor2D};
}

/**
 * Main MusicVAE model class.
 *
 * A MusicVAE is a variational autoencoder made up of an `Encoder` and
 * `Decoder`, along with a `DataConverter` for converting between `Tensor`
 * and `NoteSequence` objects for input and output.
 *
 * Exposes methods for interpolation and sampling of musical sequences.
 */
class MusicVAE {
  private checkpointURL: string;
  private spec: MusicVAESpec;

  public dataConverter: data.DataConverter;
  private chordEncoder?: chords.ChordEncoder;

  private encoder: Encoder;
  private decoder: Decoder;
  private rawVars: {[varName: string]: tf.Tensor};  // Store for disposal.

  public zDims: number;

  initialized = false;

  /**
   * `MusicVAE` constructor.
   *
   * @param checkpointURL Path to the checkpoint directory.
   * @param spec (Optional) `MusicVAESpec` object. If undefined, will be
   * loaded from a `config.json` file in the checkpoint directory.
   */
  constructor(checkpointURL: string, spec?: MusicVAESpec) {
    this.checkpointURL = checkpointURL;
    this.spec = spec;
  }

  /**
   * Instantiates data converter, attention length, chord encoder, and
   * auxiliary inputs from the `MusicVAESpec`.
   */
  private instantiateFromSpec() {
    this.dataConverter = data.converterFromSpec(this.spec.dataConverter);
    this.chordEncoder = this.spec.chordEncoder ?
        chords.chordEncoderFromType(this.spec.chordEncoder) :
        undefined;
  }

  /**
   * Disposes of any untracked `Tensors` to avoid GPU memory leaks.
   */
  dispose() {
    if (this.rawVars !== undefined) {
      Object.keys(this.rawVars).forEach(name => this.rawVars[name].dispose());
    }
    this.encoder = undefined;
    this.decoder = undefined;
    this.initialized = false;
  }

  private getLstmLayers(
      cellFormat: string, vars: {[varName: string]: tf.Tensor}) {
    const lstmLayers: LayerVars[] = [];
    let l = 0;
    while (true) {
      const cellPrefix = cellFormat.replace('%d', l.toString());
      if (!(cellPrefix + 'kernel' in vars)) {
        break;
      }
      lstmLayers.push(new LayerVars(
          vars[cellPrefix + 'kernel'] as tf.Tensor2D,
          vars[cellPrefix + 'bias'] as tf.Tensor1D));
      ++l;
    }
    return lstmLayers;
  }

  /**
   * Loads variables from the checkpoint and instantiates the `Encoder` and
   * `Decoder`.
   */
  async initialize() {
    this.dispose();
    const startTime = performance.now();

    if (!this.spec) {
      await fetch(`${this.checkpointURL}/config.json`)
          .then((response) => response.json())
          .then((spec) => {
            if (spec.type !== 'MusicVAE') {
              throw new Error(
                  `Attempted to instantiate MusicVAE model with incorrect type:
                  ${spec.type}`);
            }
            this.spec = spec;
          });
    }

    this.instantiateFromSpec();

    const LSTM_CELL_FORMAT = 'cell_%d/lstm_cell/';
    const MUTLI_LSTM_CELL_FORMAT = `multi_rnn_cell/${LSTM_CELL_FORMAT}`;
    const CONDUCTOR_PREFIX = 'decoder/hierarchical_level_0/';
    const BIDI_LSTM_CELL =
        'cell_%d/bidirectional_rnn/%s/multi_rnn_cell/cell_0/lstm_cell/';
    const ENCODER_FORMAT = `encoder/${BIDI_LSTM_CELL}`;
    const HIER_ENCODER_FORMAT =
        `encoder/hierarchical_level_%d/${BIDI_LSTM_CELL.replace('%d', '0')}`;
    const CONTROL_BIDI_LSTM_CELL = `control_preprocessing/${BIDI_LSTM_CELL}`;

    const vars = await fetch(`${this.checkpointURL}/weights_manifest.json`)
                     .then((response) => response.json())
                     .then(
                         (manifest: tf.io.WeightsManifestConfig) =>
                             tf.io.loadWeights(manifest, this.checkpointURL));
    this.rawVars = vars;  // Save for disposal.

    // Encoder variables.
    const encMu = new LayerVars(
        vars['encoder/mu/kernel'] as tf.Tensor2D,
        vars['encoder/mu/bias'] as tf.Tensor1D);

    if (this.dataConverter.numSegments) {
      const fwLayers =
          this.getLstmLayers(HIER_ENCODER_FORMAT.replace('%s', 'fw'), vars);
      const bwLayers =
          this.getLstmLayers(HIER_ENCODER_FORMAT.replace('%s', 'bw'), vars);

      if (fwLayers.length !== bwLayers.length || fwLayers.length !== 2) {
        throw Error(
            'Only 2 hierarchical encoder levels are supported. ' +
            `Got ${fwLayers.length} forward and ${bwLayers.length} ` +
            'backward.');
      }
      const baseEncoders: BidirectionalLstmEncoder[] = [0, 1].map(
          l => new BidirectionalLstmEncoder(fwLayers[l], bwLayers[l]));
      this.encoder = new HierarchicalEncoder(
          baseEncoders, [this.dataConverter.numSegments, 1], encMu);

    } else {
      const fwLayers =
          this.getLstmLayers(ENCODER_FORMAT.replace('%s', 'fw'), vars);
      const bwLayers =
          this.getLstmLayers(ENCODER_FORMAT.replace('%s', 'bw'), vars);
      if (fwLayers.length !== bwLayers.length || fwLayers.length !== 1) {
        throw Error(
            'Only single-layer bidirectional encoders are supported. ' +
            `Got ${fwLayers.length} forward and ${bwLayers.length} ` +
            'backward.');
      }
      this.encoder =
          new BidirectionalLstmEncoder(fwLayers[0], bwLayers[0], encMu);
    }

    // Whether or not we have variables for bidirectional control preprocessing.
    const hasControlBidiLayers = `${
                                     CONTROL_BIDI_LSTM_CELL.replace('%s', 'fw')
                                         .replace('%d', '0')}kernel` in vars;

    // BaseDecoder variables.
    const decVarPrefix =
        (this.dataConverter.numSegments) ? 'core_decoder/' : '';

    const decVarPrefixes: string[] = [];
    if (this.dataConverter.NUM_SPLITS) {
      for (let i = 0; i < this.dataConverter.NUM_SPLITS; ++i) {
        decVarPrefixes.push(`${decVarPrefix}core_decoder_${i}/decoder/`);
      }
    } else {
      decVarPrefixes.push(`${decVarPrefix}decoder/`);
    }

    let controlLstmFwLayers: LayerVars[] = [null];
    let controlLstmBwLayers: LayerVars[] = [null];
    if (hasControlBidiLayers) {
      controlLstmFwLayers =
          this.getLstmLayers(CONTROL_BIDI_LSTM_CELL.replace('%s', 'fw'), vars);
      controlLstmBwLayers =
          this.getLstmLayers(CONTROL_BIDI_LSTM_CELL.replace('%s', 'bw'), vars);
      if (controlLstmFwLayers.length !== controlLstmBwLayers.length ||
          controlLstmFwLayers.length !== 1) {
        throw Error(
            'Only single-layer bidirectional control preprocessing is ' +
            'supported. Got ' +
            `${controlLstmFwLayers.length} forward and ${
                controlLstmBwLayers.length} backward.`);
      }
    }

    const baseDecoders = decVarPrefixes.map((varPrefix) => {
      const decLstmLayers =
          this.getLstmLayers(varPrefix + MUTLI_LSTM_CELL_FORMAT, vars);
      const decZtoInitState = new LayerVars(
          vars[`${varPrefix}z_to_initial_state/kernel`] as tf.Tensor2D,
          vars[`${varPrefix}z_to_initial_state/bias`] as tf.Tensor1D);
      const decOutputProjection = new LayerVars(
          vars[`${varPrefix}output_projection/kernel`] as tf.Tensor2D,
          vars[`${varPrefix}output_projection/bias`] as tf.Tensor1D);

      if (`${varPrefix}nade/w_enc` in vars) {
        return new NadeDecoder(
                   decLstmLayers, decZtoInitState, decOutputProjection,
                   new Nade(
                       vars[`${varPrefix}nade/w_enc`] as tf.Tensor3D,
                       vars[`${varPrefix}nade/w_dec_t`] as tf.Tensor3D),
                   controlLstmFwLayers[0], controlLstmBwLayers[0]) as Decoder;
      } else if (this.spec.dataConverter.type === 'GrooveConverter') {
        return new GrooveDecoder(
                   decLstmLayers, decZtoInitState, decOutputProjection,
                   undefined, controlLstmFwLayers[0], controlLstmBwLayers[0]) as
            Decoder;
      } else if (this.spec.useBooleanDecoder) {
        return new BooleanDecoder(
            decLstmLayers, decZtoInitState, decOutputProjection, undefined,
            controlLstmFwLayers[0], controlLstmBwLayers[0]);
      } else {
        return new CategoricalDecoder(
                   decLstmLayers, decZtoInitState, decOutputProjection,
                   undefined, controlLstmFwLayers[0], controlLstmBwLayers[0]) as
            Decoder;
      }
    });

    // ConductorDecoder variables.
    if (this.dataConverter.numSegments) {
      const condL