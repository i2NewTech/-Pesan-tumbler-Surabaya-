/**
 * Module containing functionality for encoding chord symbol strings as tensors
 * for input to models, typically as a conditioning variable.
 *
 * @license
 * Copyright 2018 Google Inc. All Rights Reserved.
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
import {Chord, Note} from 'tonal';
import * as constants from './constants';

const CHORD_QUALITY_INTERVALS = [
  ['1P', '3M', '5P'],  // major
  ['1P', '3m', '5P'],  // minor
  ['1P', '3M', '5A'],  // augmented
  ['1P', '3m', '5d'],  // diminished
];

export enum ChordQuality {
  Major = 0,
  Minor = 1,
  Augmented = 2,
  Diminished = 3,
  Other = 4,
}

export class ChordSymbolException extends Error {
  constructor(message?: string) {
    super(message);
    Object.setPrototypeOf(this, new.target.prototype);
  }
}

export class ChordEncodingException extends Error {
  constructor(message?: string) {
    super(message);
    Object.setPrototypeOf(this, new.target.prototype);
  }
}

/**
 * Class containing static methods related to chord symbol interpretation. These
 * functions make use of the Tonal.js music theory library, and are used when
 * converting chord symbols to model inputs.
 */
export class ChordSymbols {
  /**
