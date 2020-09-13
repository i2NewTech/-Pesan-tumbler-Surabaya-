/**
 * A module containing a Tone.js-powered player for `NoteSequences`.
 *
 * @license
 * Copyright 2018 Google Inc. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
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
// @ts-ignore
import * as Tone from 'tone';

import {performance} from '../core/compat/global';
import {INoteSequence, NoteSequence} from '../protobuf/index';

import * as constants from './constants';
import * as soundfont from './soundfont';
import * as sequences from './sequences';

function compareQuantizedNotes(a: NoteSequence.INote, b: NoteSequence.INote) {
  if (a.quantizedStartStep < b.quantizedStartStep) {
    return -1;
  }
  if (a.quantizedStartStep > b.quantizedStartStep) {
    return 1;
  }
  if (a.pitch < b.pitch) {
    return -1;
  }
  return 1;
}

/**
 * An abstract base class for providing arbitrary callbacks for each note
 * played.
 */
export abstract class BasePlayerCallback {
  /**
   * Will be called for each time/note pair in a sequence being played.
   *
   * @param n The note being played at the moment.
   * @param t The time at which the note is being played.
   */
  abstract run(n: NoteSequence.INote, t?: number): void;

  /*  Will be called when a sequence is stopped.
   */
  abstract stop(): void;
}

/**
 * Abstract base class for a `NoteSequence` player based on Tone.js.
 */
export abstract class BasePlayer {
  protected currentPart: any;  // tslint:disable-line:no-any
  protected scheduledStop: number;
  protected playClick: boolean;
  protected callbackObject: BasePlayerCallback;
  protected desiredQPM: number;

  protected abstract playNote(time: number, note: NoteSequence.INote): void;

  /**
   *   `BasePlayer` constructor.
   *
   *   @param playClick A boolean, determines whether the click will be played.
   *   @param callbackObject An optional BasePlayerCallback, specifies an
   *     object that contains run() and stop() methods to invode