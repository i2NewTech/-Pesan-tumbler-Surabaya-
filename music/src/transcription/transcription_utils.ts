/**
 * Utility functions for [Onsets and Frames]{@link
 * https://g.co/magenta/onsets-frames} models.
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

import {NoteSequence} from '../protobuf/index';

import {FRAME_LENGTH_SECONDS, MIDI_PITCHES, MIN_MIDI_PITCH} from './constants';

// The number of frames of padding needed on each side when splitting into
// batches to account for the receptive field (which is a total of 7 for this
// model).
const RF_PAD = 3;

/**
 * Batches the input, adding padding for the receptive field.
 *
 * For batches in the middle (not the first or last), we pad the beginning and
 * end with values from the previous and following batches to cover the
 * receptive field.
 *
 * We can't just use zero padding for the first and last batch since bias will
 * be added to it, making it non-zero after the first convolution. This does
 * not match how `same` padding works, which is reset to 0 at each layer.
 * Instead we treat the first and last batch differently. The first batch has no
 * initial padding and we include extra padding from the second batch on the end
 * to make its length match. The final batch has no end padding and we include
 * extra padding from the previous batch to the beginning to make its length
 * match.
 *
 * In most cases, the number of batches will equal `ceil(input.shape[0] /
 * batchLength)`. However, in rare cases where the final batch would be shorter
 * than the receptive field, it is instead appended to the previous batch,
 * reducing the final batch size by 1.
 *
 * @param input The 2D input matrix, shaped [N, D].
 * @param batchLength The desired batch size (excluding receptive field
 * padding). The final batch may be less or slightly more than this.
 * @returns The 3D batched input, shaped [B, batchLength + RF_PAD * 2, D]
 */
export function batchInput(input: number[][], batchLength: number) {
  let batchSize = Math.ceil(input.length / batchLength);
  let batchRemainder = input.length % batchLength;
  // If the last batch is smaller than our receptive field padding, we need
  // to merge it with the previous batch.
  let mergedRemainder = 0;
  if (batchSize > 1 && batchRemainder > 0 && batchRemainder <= RF_PAD) {
    batchSize -= 1;
    mergedRemainder = batchRemainder;
    batchRemainder = 0;
  }
  if (batchSize === 1) {
    return tf.tensor2d(input).expandDims(0) as tf.Tensor3D;
  }

  // Add some extra RF padding to the end/beginning of the first/last batches
  // so their lengths match the mid batches (if applicable).
  const actualBatchLength = batchLength + 2 * RF_PAD;
  const firstBatch =
      tf.tensor2d(input.slice(0, actualBatchLength)).expandDims(0) as
      tf.Tensor3D;
  const lastBatch = tf.tensor2d(input.slice(input.length - actualBatchLength))
                        .expandDims(0) as tf.Tensor3D;

  if (batchSize === 2) {
    return tf.concat([firstBatch, lastBatch], 0);
  }

  // Add zero padding to make the length divisible by the
  // this.batchLength. Don't worry about receptive field padding for now.
  let naivePaddedBatches;
  if (batchRemainder) {
    naivePaddedBatches = tf.tensor2d(input)
                             .pad([[0, batchLength - batchRemainder], [0, 0]])
                             .as3D(batchSize, batchLength, -1);
  } else {
    naivePaddedBatches =
        tf.tensor2d(input.slice(0, input.length - mergedRemainder))
            .as3D(batchSize, batchL