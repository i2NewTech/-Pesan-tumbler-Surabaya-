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
 * of `NoteOn`, `NoteOff`, `TimeShift`, a