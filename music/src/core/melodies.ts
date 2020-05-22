
/**
 * Module containing functions for converting to and from quantized melodies.
 *
 * @license
 * Copyright 2020 Google Inc. All Rights Reserved.
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

/**
 * Imports
 */
import * as tf from '@tensorflow/tfjs';
import {INoteSequence, NoteSequence} from '../protobuf/index';

import * as sequences from './sequences';

export const NO_EVENT = 0;
export const NOTE_OFF = 1;
const FIRST_PITCH = 2;

/**
 * Melody representation as an array of integers: 0 for `NO_EVENT` (sustain), 1
 * for `NOTE_OFF`, and 2+ for note onsets at pitches between `minPitch` and
 * `maxPitch`.  Each position in the array corresponds to a fixed length of
 * time.  So, `[2, 4, 6, 7, 9, 11, 13, 14, 0, 0, 0, 1]` represents a major scale
 * where the final note is held for 4 time steps then released.
 *
 * @param events An array of melody events.
 * @param minPitch The minimum pitch to represent.
 * @param maxPitch The maximum pitch to represent.
 *
 */
export class Melody {
  readonly events: ArrayLike<number>;
  readonly minPitch: number;
  readonly maxPitch: number;

  constructor(events: ArrayLike<number>, minPitch: number, maxPitch: number) {
    this.events = events;
    this.minPitch = minPitch;
    this.maxPitch = maxPitch;
  }

  /**
   * Extract a melody from a `NoteSequence`.