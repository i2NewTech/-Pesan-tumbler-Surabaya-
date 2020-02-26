/**
 * Module containing functionality for creating and using `DataConverter`
 * objects that convert between tensors and `NoteSequence`s. A `DataConverter`
 * is created from a `ConverterSpec` (typically read from JSON) that specifies
 * the converter type and optional arguments.
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

import {INoteSequence, NoteSequence} from '../protobuf/index';

import * as constants from './constants';
import {DEFAULT_DRUM_PITCH_CLASSES} from './constants';
import * as logging from './logging';
import {Melody, MelodyControl, MelodyRhythm, MelodyShape} from './melodies';
import * as performance from './performance';
import * as sequences from './sequences';

export {DEFAULT_DRUM_PITCH_CLASSES};

export interface MelodyConverterSpec {
  type: 'MelodyConverter';
  args: MelodyConverterArgs;
}
export interface MelodyRhythmConverterSpec {
  type: 'MelodyRhythmConverter';
  args: MelodyConverterArgs;
}
export interface MelodyShapeConverterSpec {
  type: 'MelodyShapeConverter';
  args: MelodyConverterArgs;
}
export interface DrumsConverterSpec {
  type: 'DrumsConverter';
  args: DrumsConverterArgs;
}
export interface DrumRollConverterSpec {
  type: 'DrumRollConverter';
  args: DrumsConverterArgs;
}
export interface TrioConverterSpec {
  type: 'TrioConverter';
  args: TrioConverterArgs;
}
export interface TrioRhythmConverterSpec {
  type: 'TrioRhythmConverter';
  args: TrioConverterArgs;
}
export interface DrumsOneHotConverterSpec {
  type: 'DrumsOneHotConverter';
  args: DrumsConverterArgs;
}
export interface MultitrackConverterSpec {
  type: 'MultitrackConverter';
  args: MultitrackConverterArgs;
}

export interface GrooveConverterSpec {
  type: 'GrooveConverter';
  args: GrooveConverterArgs;
}

/**
 * Interface for JSON specification of a `DataConverter`.
 *
 * @property type The name of the `DataConverter` class.
 * @property args Map containing values for argments to the constructor of the
 * `DataConverter` class specified above.
 */
export type ConverterSpec = MelodyConverterSpec|MelodyRhythmConverterSpec|
    MelodyShapeConverterSpec|DrumsConverterSpec|DrumRollConverterSpec|
    TrioConverterSpec|TrioRhythmConverterSpec|DrumsOneHotConverterSpec|
    MultitrackConverterSpec|GrooveConverterSpec;

/**
 * Builds a `DataConverter` based on the given `ConverterSpec`.
 *
 * @param spec Specifies the `DataConverter` to build.
 * @returns A new `DataConverter` object based on `spec`.
 */
export function converterFromSpec(spec: ConverterSpec): DataConverter {
  switch (spec.type) {
    case 'MelodyConverter':
      return new MelodyConverter(spec.args);
    case 'MelodyRhythmConverter':
      return new MelodyRhythmConverter(spec.args);
    case 'MelodyShapeConverter':
      return new MelodyShapeConverter(spec.args);
    case 'DrumsConverter':
      return new DrumsConverter(spec.args);
    case 'DrumRollConverter':
      return new DrumRollConverter(spec.args);
    case 'TrioConverter':
      return new TrioConverter(spec.args);
    case 'TrioRhythmConverter':
      return new TrioRhythmConverter(spec.args);
    case 'DrumsOneHotConverter':
      return new DrumsOneHotConverter(spec.args);
    case 'MultitrackConverter':
      return new MultitrackConverter(spec.args);
    case 'GrooveConverter':
      return new GrooveConverter(spec.args);
    default:
      throw new Error(`Unknown DataConverter type: ${spec}`);
  }
}

/**
 * Constructor arguments shared by all `DataConverter`s.
 *
 * @param numSteps The length of each sequence.
 * @param numSegments (Optional) The number of conductor segments, if
 * applicable.
 */
export interface BaseConverterArgs {
  numSteps?: number;
  numSegments?: number;
}

/**
 * Abstract DataConverter class for converting between `Tensor` and
 * `NoteSequence` objects. Each subclass handles a particular type of musical
 * sequence e.g. monophonic melody or (a few different representations of) drum
 * track.
 */
export abstract class DataConverter {
  readonly numSteps: number;                 // Total length of sequences.
  readonly numSegments: number;              // Number of steps for conductor.
  abstract readonly depth: number;           // Size of final output dimension.
  abstract readonly endTensor: tf.Tensor1D;  // Tensor marking segment end.
  readonly NUM_SPLITS: number = 0;  // Const number of conductor splits.
  readonly SEGMENTED_BY_TRACK: boolean = false;  // Segments are tracks.

  abstract toTensor(noteSequence: INoteSequence): tf.Tensor2D;
  abstract async toNoteSequence(
      tensor: tf.Tensor2D, stepsPerQuarter?: number,
      qpm?: number): Promise<INoteSequence>;

  constructor(args: BaseConverterArgs) {
    this.numSteps = args.numSteps;
    this.numSegments = args.numSegments;
  }

  tensorSteps(tensor: tf.Tensor2D): tf.Scalar {
    return tf.scalar(tensor.shape[0], 'int32');
  }
}

/**
 * Converts between a quantized `NoteSequence` containing a drum sequence
 * and the `Tensor` objects used by `MusicVAE`.
 *
 * The `Tensor` output by `toTensor` is a 2D "drum roll" format. Each
 * row is a time step, and each column (up to the final) is a vector of Booleans
 * representing whether a drum from the associated pitch class is being hit at
 * that time. The final column is a Boolean computed by taking a NOR of the
 * other columns in the row.
 *
 * The expected `Tensor` in `toNoteSequence` is a one-hot encoding of labels
 * generated by converting the bit string from the input (excluding the final
 * bit) to an integer.
 *
 * The output `NoteSequence` uses quantized time and only the first pitch in
 * pitch class are used.
 *
 * @param numSteps The length of each sequence.
 * @param numSegments (Optional) The number of conductor segments, if
 * applicable.
 * @param pitchClasses (Optional) An array of arrays, grouping together MIDI
 * pitches to treat as the same drum. The first pitch in each class will be used
 * in the `NoteSequence` returned by `toNoteSequence`. A default mapping to 9
 * classes is used if not provided.
 */
export interface DrumsConverterArgs extends BaseConverterArgs {
  pitchClasses?: number[][];
}
export class DrumsConverter extends DataConverter {
  readonly pitchClasses: number[][];
  readonly pitchToClass: Map<number, number>;
  readonly depth: number;
  readonly endTensor: tf.Tensor1D;

  constructor(args: DrumsConverterArgs) {
    super(args);
    this.pitchClasses = args.pitchClasses || DEFAULT_DRUM_PITCH_CLASSES;
    this.pitchToClass = new Map<number, number>();
    for (let c = 0; c < this.pitchClasses.length; ++c) {  // class
      this.pitchClasses[c].forEach((p) => {
        this.pitchToClass.set(p, c);
      });
    }
    this.depth = this.pitchClasses.length + 1;
  }

  toTensor(noteSequence: INoteSequence): tf.Tensor2D {
    sequences.assertIsQuantizedSequence(noteSequence);
    const numSteps = this.numSteps || noteSequence.totalQuantizedSteps;
    const drumRoll =
        tf.buffer([numSteps, this.pitchClasses.length + 1], 'int32');
    // Set final values to 1 and change to 0 later if the column gets a note.
    for (let i = 0; i < numSteps; ++i) {
      drumRoll.set(1, i, -1);
    }
    noteSequence.notes.forEach((note) => {
      drumRoll.set(
          1, note.quantizedStartStep, this.pitchToClass.get(note.pitch));
      drumRoll.set(0, note.quantizedStartStep, -1);
    });
    return drumRoll.toTensor() as tf.Tensor2D;
  }

  async toNoteSequence(
      oh: tf.Tensor2D, stepsPerQuarter?: number, qpm?: number) {
    const noteSequence =
        sequences.createQuantizedNoteSequence(stepsPerQuarter, qpm);
    const labelsTensor = oh.argMax(1);
    const labels: Int32Array = await labelsTensor.data() as Int32Array;
    labelsTensor.dispose();
    for (let s = 0; s < labels.length; ++s) {               // step
      for (let p = 0; p < this.pitchClasses.length; p++) {  // pitch class
        if (labels[s] >> p & 1) {
          noteSequence.notes.push(NoteSequence.Note.create({
            pitch: this.pitchClasses[p][0],
            quantizedStartStep: s,
            quantizedEndStep: s + 1,
            isDrum: true
          }));
        }
      }
    }
    noteSequence.totalQuantizedSteps = labels.length;
    return noteSequence;
  }
}

/**
 * Converts between a quantized `NoteSequence` containing a drum sequence
 * and the `Tensor` objects used by `MusicVAE`.
 *
 * The `Tensor` output by `toTensor` is the same 2D "drum roll" as in
 * `DrumsConverter`.
 *
 * The expected `Tensor` in `toNoteSequence` is the same as the "drum roll",
 * excluding the final NOR column.
 *
 * The output `NoteSequence` uses quantized time and only the first pitch in
 * pitch class are used.
 */
export class DrumRollConverter extends DrumsConverter {
  async toNoteSequence(
      roll: tf.Tensor2D, stepsPerQuarter?: number, qpm?: number) {
    const noteSequence =
        sequences.createQuantizedNoteSequence(stepsPerQuarter, qpm);
    const flatRoll = await roll.data() as Uint8Array;
    for (let s = 0; s < roll.shape[0]; ++s) {  // step
      const pitches = flatRoll.slice(
          s * this.pitchClasses.length, (s + 1) * this.pitchClasses.length);
      for (let p = 0; p < pitches.length; ++p) {  // pitch class
        if (pitches[p]) {
          noteSequence.notes.push(NoteSequence.Note.create({
            pitch: this.pitchClasses[p][0],
            quantizedStartStep: s,
            quantizedEndStep: s + 1,
            isDrum: true
          }));
        }
      }
    }
    noteSequence.totalQuantizedSteps = roll.shape[0];
    return noteSequence;
  }
}

/**
 * Converts between a quantized `NoteSequence` containing a drum sequence
 * and the `Tensor` objects used by `MusicRNN`.
 *
 * The `Tensor` output by `toTensor` is a 2D one-hot encoding. Each
 * row is a time step, and each column is a one-hot vector where each drum
 * combination is mapped to a single bit of a binary integer representation,
 * where the bit has value 0 if the drum combination is not present, and 1 if
 * it is present.
 *
 * The expected `Tensor` in `toNoteSequence` is the same kind of one-hot
 * encoding as the `Tensor` output by `toTensor`.
 *
 * The output `NoteSequence` uses quantized time and only the first pitch in
 * pitch class are used.
 *
 */
export class DrumsOneHotConverter extends DrumsConverter {
  readonly depth: number;

  constructor(args: DrumsConverterArgs) {
    super(args);
    this.depth = Math.pow(2, this.pitchClasses.length);
  }

  toTensor(noteSequence: INoteSequence): tf.Tensor2D {
    sequences.assertIsRelativeQuantizedSequence(noteSequence);
    const numSteps = this.numSteps || noteSequence.totalQuantizedSteps;
    const labels = Array<number>(numSteps).fill(0);
    for (const {pitch, quantizedStartStep} of noteSequence.notes) {
      labels[quantizedStartStep] += Math.pow(2, this.pitchToClass.get(pitch));
    }
    return tf.tidy(
        () =>
            tf.oneHot(tf.tensor1d(labels, 'int32'), this.depth) as tf.Tensor2D);
  }
}

/**
 * Converts between a monophonic, quantized `NoteSequence` containing a melody
 * and the `Tensor` objects used by `MusicVAE`.
 *
 * Melodies are represented as a sequence of categorical variables, representing
 * one of three possible events:
 *   - A non-event, i.e. holding a note or resting. (0)
 *   - A note off. (1)
 *   - A note on with a specific pitch. (> 1)
 *
 * The `Tensor` output by `toTensor` is a one-hot encoding of the sequence of
 * labels extracted from the `NoteSequence`.
 *
 * The expected `Tensor` in `toNoteSequence` is a one-hot encoding of melody
 * sequence labels like those returned by `toTensor`.
 *
 * @param numSteps The length of each sequence.
 * @param minPitch The minimum pitch to model. Those above this value will
 * cause an error to be thrown.
 * @param maxPitch The maximum pitch to model. Those above this value will
 * cause an error to be thrown.
 * @param ignorePolpyhony (default: true) If false, an error will be raised
 * when notes start at the same step. If true, the highest pitched note is used
 * and others are ignored.
 * @param numSegments (Optional) The number of conductor segments, if
 * applicable.
 */
export interface MelodyConverterArgs extends BaseConverterArgs {
  minPitch: number;
  maxPitch: number;
  ignorePolyphony?: boolean;
}
export class MelodyConverter extends DataConverter {
  readonly minPitch: number;  // inclusive
  readonly maxPitch: number;  // inclusive
  readonly ignorePolyphony: boolean;
  readonly depth: number;
  readonly endTensor: tf.Tensor1D;

  readonly NOTE_OFF = 1;     // const
  readonly FIRST_PITCH = 2;  // const

  constructor(args: MelodyConverterArgs) {
    super(args);
    this.minPitch = args.minPitch;
    this.maxPitch = args.maxPitch;
    this.ignorePolyphony = args.ignorePolyphony;
    this.depth = args.maxPitch - args.minPitch + 1 + this.FIRST_PITCH;
  }

  toTensor(noteSequence: INoteSequence): tf.Tensor2D {
    const melody = Melody.fromNoteSequence(
        noteSequence, this.minPitch, this.maxPitch, this.ignorePolyphony,
        this.numSteps);
    return tf.tidy(
        () => tf.oneHot(
                  tf.tensor(melody.events, [melody.events.length], 'int32') as
                      tf.Tensor1D,
                  this.depth) as tf.Tensor2D);
  }

  async toNoteSequence(
      oh: tf.Tensor2D, stepsPerQuarter?: number, qpm?: number) {
    const labelsTensor = oh.argMax(1);
    const labels: Int32Array = await labelsTensor.data() as Int32Array;
    labelsTensor.dispose();
    const melody = new Melody(labels, this.minPitch, this.maxPitch);
    return melody.toNoteSequence(stepsPerQuarter, qpm);
  }
}

/**
 * Abstract `MelodyControlConverter` class for handling melody control signals.
 * The `toTensor` method first extracts a monophonic melody from the
 * `NoteSequence` then extracts the control signal from the melody. The
 * `toNoteSequence` method is left undefined here but can be used by subclasses
 * for debugging purposes.
 *
 * @param numSteps The length of each sequence.
 * @param minPitch The minimum melody pitch.
 * @param maxPitch The maximum melody pitch.
 * @param ignorePolpyhony Whether to raise an error if multiple notes start at
 * the same step.
 * @param numSegments (Optional) The number of conductor segments.
 */
abstract class MelodyControlConverter extends DataConverter {
  readonly minPitch: number;
  readonly maxPitch: number;
  readonly ignorePolyphony: boolean;
  readonly melodyControl: MelodyControl;
  readonly depth: number;
  readonly endTensor: tf.Tensor1D;

  constructor(args: MelodyConverterArgs, melodyControl: MelodyControl) {
    super(args);
    this.minPitch = args.minPitch;
    this.maxPitch = args.maxPitch;
    this.ignorePolyphony = args.ignorePolyphony;
    this.melodyControl = melodyControl;
    this.depth = melodyControl.depth;
  }

  toTensor(noteSequence: INoteSequence): tf.Tensor2D {
    const melody = Melody.fromNoteSequence(
        noteSequence, this.minPitch, this.maxPitch, this.ignorePolyphony,
        this.numSteps);
    return this.melodyControl.extract(melody);
  }
}

/**
 * 