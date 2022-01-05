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
 * batchLength)`. However, in rare cases where the final ba