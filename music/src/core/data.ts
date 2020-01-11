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
export interface BaseConve