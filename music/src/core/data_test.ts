/**
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

import * as tf from '@tensorflow/tfjs';
import * as test from 'tape';

import {NoteSequence} from '../protobuf/index';

import * as constants from './constants';
import * as data from './data';
import * as sequences from './sequences';

const MEL_NS = NoteSequence.create({
  notes: [
    {pitch: 69, quantizedStartStep: 0, quantizedEndStep: 2},
    {pitch: 71, quantizedStartStep: 2, quantizedEndStep: 4},
    {pitch: 73, quantizedStartStep: 4, quantizedEndStep: 6},
    {pitch: 74, quantizedStartStep: 6, quantizedEndStep: 8},
    {pitch: 76, quantizedStartStep: 8, quantizedEndStep: 10},
    {pitch: 81, quantizedStartStep: 12, quantizedEndStep: 16},
    {pitch: 77, quantizedStartStep: 16, quantizedEndStep: 20},
    {pitch: 80, quantizedStartStep: 20, quantizedEndStep: 24},
    {pitch: 75, quantizedStartStep: 24, quantizedEndStep: 28}
  ],
  tempos: [{qpm: 120}],
  quantizationInfo: {stepsPerQuarter: 2},
  totalQuantizedSteps: 32,
});

const DRUM_NS = NoteSequence.create({
  notes: [
    {pitch: 36, quantizedStartStep: 0}, {pitch: 42, quantizedStartStep: 0},
    {pitch: 36, quantizedStartStep: 4}, {pitch: 42, quantizedStartStep: 6},
    {pitch: 36, quantizedStartStep: 8}, {p