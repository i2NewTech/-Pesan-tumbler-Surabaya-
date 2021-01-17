
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
import * as sequences from './sequences';

const STEPS_PER_QUARTER = 4;

function createTestNS() {
  const ns = NoteSequence.create();

  ns.tempos.push(NoteSequence.Tempo.create({qpm: 60, time: 0}));

  ns.timeSignatures.push(NoteSequence.TimeSignature.create({
    time: 0,
    numerator: 4,
    denominator: 4,
  }));

  return ns;
}

function addTrackToSequence(
    ns: NoteSequence, instrument: number, notes: number[][]) {
  for (const noteParams of notes) {
    const note = new NoteSequence.Note({
      pitch: noteParams[0],
      instrument,
      velocity: noteParams[1],
      startTime: noteParams[2],
      endTime: noteParams[3]
    });
    ns.notes.push(note);
    if (ns.totalTime < note.endTime) {
      ns.totalTime = note.endTime;
    }
  }
}

function addQuantizedTrackToSequence(
    ns: NoteSequence, instrument: number, notes: number[][]) {
  for (const noteParams of notes) {
    const note = new NoteSequence.Note({
      pitch: noteParams[0],
      instrument,
      velocity: noteParams[1],
      quantizedStartStep: noteParams[2],
      quantizedEndStep: noteParams[3]
    });
    ns.notes.push(note);
    if (ns.totalQuantizedSteps < note.quantizedEndStep) {
      ns.totalQuantizedSteps = note.quantizedEndStep;
    }
  }
}

function addChordsToSequence(
    ns: NoteSequence, chords: Array<Array<number|string>>) {
  for (const chordParams of chords) {
    const ta = NoteSequence.TextAnnotation.create({
      text: chordParams[0] as string,
      time: chordParams[1] as number,
      annotationType:
          NoteSequence.TextAnnotation.TextAnnotationType.CHORD_SYMBOL
    });
    ns.textAnnotations.push(ta);
  }
}

function addControlChangesToSequence(
    ns: NoteSequence, instrument: number, controlChanges: number[][]) {
  for (const ccParams of controlChanges) {
    const cc = NoteSequence.ControlChange.create({
      time: ccParams[0],
      controlNumber: ccParams[1],
      controlValue: ccParams[2],
      instrument
    });
    ns.controlChanges.push(cc);
  }
}

function addQuantizedStepsToSequence(
    ns: NoteSequence, quantizedSteps: number[][]) {
  quantizedSteps.forEach((qstep, i) => {
    const note = ns.notes[i];
    note.quantizedStartStep = qstep[0];
    note.quantizedEndStep = qstep[1];
    if (note.quantizedEndStep > ns.totalQuantizedSteps) {
      ns.totalQuantizedSteps = note.quantizedEndStep;
    }
  });
}

function addQuantizedChordStepsToSequence(
    ns: NoteSequence, quantizedSteps: number[]) {
  const chordAnnotations = ns.textAnnotations.filter(
      ta => ta.annotationType ===