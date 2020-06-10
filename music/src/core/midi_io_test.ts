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

import * as fs from 'fs';
import * as test from 'tape';

import {NoteSequence} from '../protobuf/index';

import * as constants from './constants';
import * as midi_io from './midi_io';
import * as sequences from './sequences';

const simpleNs = NoteSequence.create({
  ticksPerQuarter: 220,
  totalTime: 1.5,
  timeSignatures: [{time: 0, numerator: 4, denominator: 4}],
  tempos: [{time: 0, qpm: 120}],
  sourceInfo: {
    encodingType: NoteSequence.SourceInfo.EncodingType.MIDI,
    parser: NoteSequence.SourceInfo.Parser.TONEJS_MIDI_CONVERT
  },
  notes: [
    {
      instrument: 0,
      program: 0,
      startTime: 0,
      endTime: 0.125,
      pitch: 60,
      velocity: 100,
      isDrum: false
    },
    {
      instrument: 0,
      program: 0,
      startTime: 0.125,
      endTime: 0.25,
      pitch: 62,
      velocity: 100,
      isDrum: false
    },
    {
      instrument: 0,
      program: 0,
      startTime: 0.25,
      endTime: 0.375,
      pitch: 64,
      velocity: 100,
      isDrum: false
    },
    {
      instrument: 0,
      program: 0,
      startTime: 0.375,
      endTime: 0.5,
      pitch: 66,
      velocity: 100,
      isDrum: false
    },
    {
      instrument: 0,
      program: 0,
      startTime: 0.5,
      endTime: 0.625,
      pitch: 68,
      velocity: 100,
      isDrum: false
    },
    {
      instrument: 0,
      program: 0,
      startTime: 0.625,
      endTime: 0.75,
      pitch: 70,
      velocity: 100,
      isDrum: false
    },
    {
      instrument: 0,
      program: 0,
      startTime: 0.75,
      endTime: 0.875,
      pitch: 72,
      velocity: 100,
      isDrum: false
    },
    {
      instrument: 0,
      program: 0,
      startTime: 0.875,
      endTime: 1,
      pitch: 70,
      velocity: 100,
      isDrum: false
    },
    {
      instrument: 0,
      program: 0,
      startTime: 1,
      endTime: 1.125,
      pitch: 68,
      velocity: 100,
      isDrum: false
    },
    {
      instrument: 0,
      program: 0,
      startTime: 1.125,
      endTime: 1.25,
      pitch: 66,
      velocity: 100,
      isDrum: false
    },
    {
      instrument: 0,
      program: 0,
      startTime: 1.25,
      endTime: 1.375,
      pitch: 64,
      velocity: 100,
      isDrum: false
    },
    {
      instrument: 0,
      program: 0,
      startTime: 1.375,
      endTime: 1.5,
      pitch: 62,
      velocity: 100,
      isDrum: false
    }
  ],
  controlChanges: [
    {
      instrument: 0,
      program: 0,
      time: 0,
      controlNumber: 64,
  