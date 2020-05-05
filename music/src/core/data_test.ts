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
    {pitch: 36, quantizedStartStep: 8}, {pitch: 42, quantizedStartStep: 10},
    {pitch: 36, quantizedStartStep: 12}, {pitch: 42, quantizedStartStep: 14},
    {pitch: 36, quantizedStartStep: 16}, {pitch: 36, quantizedStartStep: 24},
    {pitch: 36, quantizedStartStep: 28}, {pitch: 42, quantizedStartStep: 30}
  ],
  tempos: [{qpm: 120}],
  quantizationInfo: {stepsPerQuarter: 2}
});
DRUM_NS.notes.forEach(n => {
  n.isDrum = true;
  n.quantizedEndStep = (n.quantizedStartStep as number) + 1;
});
DRUM_NS.totalQuantizedSteps = 32;

const TRIO_NS = NoteSequence.create({tempos: [{qpm: 120}]});
TRIO_NS.quantizationInfo =
    NoteSequence.QuantizationInfo.create({stepsPerQuarter: 2});
sequences.clone(MEL_NS).notes.forEach(n => {
  n.program = 0;
  n.instrument = 0;
  TRIO_NS.notes.push((n));
});
sequences.clone(MEL_NS).notes.forEach(n => {
  n.pitch -= 36;
  n.program = 32;
  n.instrument = 1;
  TRIO_NS.notes.push(n);
});
sequences.clone(DRUM_NS).notes.forEach(n => {
  n.instrument = 2;
  TRIO_NS.notes.push(n);
});
TRIO_NS.totalQuantizedSteps = 32;

const MULTITRACK_NS = NoteSequence.create({
  notes: [
    {
      pitch: 60,
      quantizedStartStep: 0,
      quantizedEndStep: 4,
      instrument: 0,
      program: 1,
      isDrum: false
    },
    {
      pitch: 67,
      quantizedStartStep: 2,
      quantizedEndStep: 4,
      instrument: 0,
      program: 1,
      isDrum: false
    },
    {
      pitch: 59,
      quantizedStartStep: 4,
      quantizedEndStep: 8,
      instrument: 0,
      program: 1,
      isDrum: false
    },
    {
      pitch: 67,
      quantizedStartStep: 6,
      quantizedEndStep: 8,
      instrument: 0,
      program: 1,
      isDrum: false
    },
    {
      pitch: 40,
      quantizedStartStep: 0,
      quantizedEndStep: 1,
      instrument: 1,
      program: 0,
      isDrum: true
    },
    {
      pitch: 50,
      quantizedStartStep: 2,
      quantizedEndStep: 3,
      instrument: 1,
      program: 0,
      isDrum: true
    },
    {
      pitch: 40,
      quantizedStartStep: 4,
      quantizedEndStep: 5,
      instrument: 1,
      program: 0,
      isDrum: true
    },
    {
      pitch: 50,
      quantizedStartStep: 6,
      quantizedEndStep: 7,
      instrument: 1,
      program: 0,
      isDrum: true
    },
  ],
  tempos: [{qpm: 120}],
  quantizationInfo: {stepsPerQuarter: 1},
  totalQuantizedSteps: 8
});

const GROOVE_NS = NoteSequence.create({
  tempos: [{qpm: 60}],
  notes: [
    {pitch: 36, startTime: 0, velocity: 80},
    {pitch: 42, startTime: 0.13, velocity: 10},
    {pitch: 36, startTime: 1.3, velocity: 15},
    {pitch: 42, startTime: 1.5, velocity: 8},
    {pitch: 36, startTime: 2, velocity: 16},
    {pitch: 42, startTime: 2.45, velocity: 4},
    {pitch: 36, startTime: 3.1, velocity: 127},
    {pitch: 42, startTime: 3.6, velocity: 80},
    {pitch: 36, startTime: 4.1, velocity: 99},
    {pitch: 36, startTime: 5.99, velocity: 2},
    {pitch: 36, startTime: 7, velocity: 3},
    {pitch: 42, startTime: 7.5, velocity: 22}
  ],
  totalTime: 8.0
});
GROOVE_NS.notes.forEach(n => {
  n.endTime = n.startTime + 0.25;
  n.isDrum = true;
});

test('Test MelodyConverter', (t: test.Test) => {
  const melConverter = new data.MelodyConverter({
    numSteps: 32,
    minPitch: 21,
    maxPitch: 108,
  });

  const melTensor = melConverter.toTensor(MEL_NS);
  t.deepEqual(melTensor.shape, [32, 90]);

  melConverter.toNoteSequence(melTensor, 2).then(ns => t.deepEqual(ns, MEL_NS));

  melTensor.dispose();
  t.end();
});

test('Test MelodyConverterWithPolyphonicInput', (t: test.Test) => {
  const melConverter = new data.MelodyConverter({
    numSteps: 32,
    minPitch: 21,
    maxPitch: 108,
  });

  const polyMelNs = sequences.clone(MEL_NS);
  polyMelNs.notes[0].quantizedEndStep = 6;
  polyMelNs.notes.push(NoteSequence.Note.create(
      {pitch: 70, quantizedStartStep: 2, quantizedEndStep: 5}));
  const melTensor = melConverter.toTensor(polyMelNs);
  t.deepEqual(melTensor.shape, [32, 90]);
  melConverter.toNoteSequence(melTensor, 2).then(ns => t.deepEqual(ns, MEL_NS));
  melTensor.dispose();

  const melConverterDisallowsPolyphony = new data.MelodyConverter({
    numSteps: 32,
    minPitch: 21,
    maxPitch: 108,
    ignorePolyphony: false,
  });
  t.throws(()