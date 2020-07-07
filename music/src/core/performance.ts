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

/**
 * Imports
 */
import {INoteSequence, NoteSequence} from '../protobuf/index';

import * as constants from './constants';
import * as sequences from './sequences';

import * as logging from './logging';

/**
 * Start a new note.
 */
export interface NoteOn {
  type: 'note-on';
  pitch: number;
}

/**
 * End an active note.
 */
export interface NoteOff {
  type: 'note-off';
  pitch: number;
}

/**
 * Move current time forward.
 */
export interface TimeShift {
  type: 'time-shift';
  steps: number;
}

/**
 * Change velocity applied to subsequent notes.
 */
export interface VelocityChange {
  type: 'velocity-change';
  velocityBin: number;
}

export type PerformanceEvent = NoteOn|NoteOff|TimeShift|VelocityChange;

/**
 * Performance representation with variable step size, consisting of a sequence
 * of `NoteOn`, `NoteOff`, `TimeShift`, and `VelocityChange` events.
 *
 * @param events An array of performance events.
 * @param maxShiftSteps Number of steps in the maximum time shift.
 * @param numVelocityBins The number of quantized MIDI velocity bins to use.
 * If zero, velocities will be ignored.
 * @param program (Optional) The MIDI program to use for these events.
 * @param isDrum (Optional) Whether or not these are drum events.
 */
export class Performance {
  readonly events: PerformanceEvent[];

  readonly maxShiftSteps: number;
  readonly numVelocityBins: number;

  readonly program?: number;
  readonly isDrum?: boolean;

  constructor(
      events: PerformanceEvent[], maxShiftSteps: number,
      numVelocityBins: number, program?: number, isDrum?: boolean) {
    this.events = events;
    this.maxShiftSteps = maxShiftSteps;
    this.numVelocityBins = numVelocityBins;

    this.program = program;
    this.isDrum = isDrum;
  }

  /**
   * Extract a performance from a `NoteSequence`.
   *
   * @param noteSequence `NoteSequence` from which to extract a performance.
   * @param maxShiftSteps Number of steps in maximum time shift.
   * @param numVelocityBins Number of velocity bins to use. If zero, ignore note
   * velocities.
   * @param instrument (Optional) Instrument to extract. If not specified,
   * extract all instruments.
   * @returns A `Performance` created from the `NoteSequence`.
   */
  static fromNoteSequence(
      noteSequence: INoteSequence, maxShiftSteps: number,
      numVelocityBins: number, instrument?: number) {
    sequences.assertIsQuantizedSequence(noteSequence);

    // First extract all desired notes and sort by increasing start time and
    // (secondarily) pitch.
    const notes = noteSequence.notes.filter(
        (note, _) =>
            instrument !== undefined ? note.instrument === instrument : true);
    const sortedNotes = notes.sort(
        (a, b) => a.startTime === b.startTime ? a.pitch - b.pitch :
                                                a.startTime - b.startTime);

    // Now sort all note start and end events by quantized time step and
    // position of the note in the above list.
    const onsets = sortedNotes.map(
        (note, i) => ({step: note.quantizedStartStep, index: i, isOffset: 0}));
    const offsets = sortedNotes.map(
        (not