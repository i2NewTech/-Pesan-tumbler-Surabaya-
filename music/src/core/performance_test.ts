
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

import * as test from 'tape';
import {NoteSequence} from '../protobuf/index';
import {Performance, PerformanceEvent} from './performance';

test('From NoteSequence', (t: test.Test) => {
  const noteSequence = NoteSequence.create({
    quantizationInfo: {stepsPerSecond: 10},
    notes: [
      {pitch: 60, velocity: 127, quantizedStartStep: 0, quantizedEndStep: 40},
      {pitch: 64, velocity: 127, quantizedStartStep: 0, quantizedEndStep: 30},
      {pitch: 67, velocity: 127, quantizedStartStep: 10, quantizedEndStep: 20},
    ],
    totalQuantizedSteps: 40
  });
  const performance = Performance.fromNoteSequence(noteSequence, 10, 0);
  const expectedEvents: PerformanceEvent[] = [
    {type: 'note-on', pitch: 60},
    {type: 'note-on', pitch: 64},
    {type: 'time-shift', steps: 10},
    {type: 'note-on', pitch: 67},
    {type: 'time-shift', steps: 10},
    {type: 'note-off', pitch: 67},
    {type: 'time-shift', steps: 10},
    {type: 'note-off', pitch: 64},
    {type: 'time-shift', steps: 10},
    {type: 'note-off', pitch: 60},
  ];
  t.deepEqual(performance.events, expectedEvents);
  t.end();
});

test('From NoteSequence With Velocity', (t: test.Test) => {
  const noteSequence = NoteSequence.create({
    quantizationInfo: {stepsPerSecond: 10},
    notes: [
      {pitch: 60, velocity: 100, quantizedStartStep: 0, quantizedEndStep: 40},
      {pitch: 64, velocity: 100, quantizedStartStep: 0, quantizedEndStep: 30},
      {pitch: 67, velocity: 127, quantizedStartStep: 10, quantizedEndStep: 20},
    ],
    totalQuantizedSteps: 40
  });
  const performance = Performance.fromNoteSequence(noteSequence, 10, 127);
  const expectedEvents: PerformanceEvent[] = [
    {type: 'velocity-change', velocityBin: 100},
    {type: 'note-on', pitch: 60},
    {type: 'note-on', pitch: 64},
    {type: 'time-shift', steps: 10},
    {type: 'velocity-change', velocityBin: 127},
    {type: 'note-on', pitch: 67},
    {type: 'time-shift', steps: 10},
    {type: 'note-off', pitch: 67},
    {type: 'time-shift', steps: 10},
    {type: 'note-off', pitch: 64},
    {type: 'time-shift', steps: 10},
    {type: 'note-off', pitch: 60},
  ];
  t.deepEqual(performance.events, expectedEvents);