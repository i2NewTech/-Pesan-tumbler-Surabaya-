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
   * Returns an array containing integers (0-11) representing the pitch classes
   * in a chord.
   * @param chord A chord symbol string.
   * @returns An array of integer pitch classes in the chord.
   * @throws {ChordSymbolException} If the chord cannot be recognized.
   */
  public static pitches(chord: string): number[] {
    const root = Chord.tokenize(chord)[0];
    if (!root || !Chord.exists(chord)) {
      throw new ChordSymbolException(`Unrecognized chord symbol: ${chord}`);
    }

    const notes = Chord.notes(chord);
    return notes.map(Note.chroma);
  }

  /**
   * Returns an integer (0-11) representing the pitch class of the chord root.
   * @param chord A chord symbol string.
   * @returns The integer pitch class of the chord root.
   * @throws {ChordSymbolException} If the chord root cannot be determined.
   */
  public static root(chord: string): number {
    const root = Chord.tokenize(chord)[0];
    if (!root) {
      throw new ChordSymbolException(`Chord symbol has unknown root: ${chord}`);
    }

    return Note.chroma(root);
  }

  /**
   * Returns the chord quality (major, minor, augmented, diminished, or other).
   * @param chord A chord symbol string.
   * @returns The ChordQuality enum value specifying the quality.
   * @throws {ChordSymbolException} If the chord cannot be recognized.
   */
  public static quality(chord: string): ChordQuality {
    if (!Chord.exists(chord)) {
      throw new ChordSymbolException(`Unrecognized chord symbol: ${chord}`);
    }

    const intervals = Chord.intervals(chord);
    const qualities = CHORD_QUALITY_INTERVALS.map(
        cqis => cqis.every(cqi => intervals.includes(cqi)));

    const i = qualities.indexOf(true);
    const j = qualities.lastIndexOf(true);

    if (i >= 0 && i === j) {
      return i;
    } else {
      return ChordQuality.Other;
    }
  }
}

/**
 * Abstract ChordEncoder class for converting chord symbols to tensors.
 */
export abstract class ChordEncoder {
  abstract depth: number;
  abstract encode(chord: string): tf.Tensor1D;

  /**
   * Encode a chord progression over a specified number of steps.
   *
   * @param chords An array of chord symbol strings.
   * @param numSteps Number of steps to use.
   * @returns A 2D tensor containing the encoded chord progression.
   */
  encodeProgression(chords: string[], numSteps: number) {
    const encodedChords = chords.map(chord =