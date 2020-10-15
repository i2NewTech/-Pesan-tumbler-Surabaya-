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
   *     object that contains run() and stop() methods to invode during
   *     playback.
   */
  constructor(playClick = false, callbackObject?: BasePlayerCallback) {
    this.playClick = playClick;
    this.callbackObject = callbackObject;
    this.desiredQPM = undefined;
  }

  /**
   * Changes the tempo of the playback.
   *
   * @param qpm The new qpm to use.
   */
  setTempo(qpm: number) {
    this.desiredQPM = qpm;
    if (Tone.Transport.state === 'started') {
      Tone.Transport.bpm.value = qpm;
    }
  }

  /**
   * Adds a click track to an existing note sequence.
   * @param seq The `NoteSequence` to augment with a click track.
   */
  private makeClickSequence(seq: INoteSequence): INoteSequence {
    const clickSeq = sequences.clone(seq);
    const sixteenthEnds = clickSeq.notes.map((n) => n.quantizedEndStep);
    const lastSixteenth = Math.max(...sixteenthEnds);
    for (let i = 0; i < lastSixteenth; i += 4) {
      const click: NoteSequence.INote = {
        pitch: i % 16 === 0 ? constants.LO_CLICK_PITCH :
                              constants.HI_CLICK_PITCH,
        quantizedStartStep: i,
        isDrum: true,
        quantizedEndStep: i + 1,
      };
      clickSeq.notes.push(click);
    }
    clickSeq.notes.sort(compareQuantizedNotes);
    return clickSeq;
  }

  /**
   * Resumes the Audio context. Due to autoplay restrictions, you must call
   * this function in a click handler (i.e. as a result of a user action) before
   * you can start playing audio with a player. This is already done in start(),
   * but you might have to call it yourself if you have any deferred/async
   * calls.
   */
  resumeContext() {
    Tone.context.resume();
  }

  /**
   * Starts playing a `NoteSequence` (either quantized or unquantized), and
   * returns a Promise that resolves when it is done playing.
   * @param seq The `NoteSequence` to play.
   * @param qpm (Optional) If specified, will play back at this qpm. If not
   * specified, will use either the qpm specified in the sequence or the
   * default of 120. Only valid for quantized sequences.
   * @param offset (Optional) The time to start playing from.
   * @returns a Promise that resolves when playback is complete.
   * @throws {Error} If this or a different player is currently playing.
   */

  start(seq: INoteSequence, qpm?: number, offset = 0): Promise<void> {
    if (this.getPlayState() === 'started') {
      throw new Error('Cannot start playback; player is already playing.');
    } else if (this.getPlayState() === 'paused') {
      throw new Error('Cannot `start()` a paused player; use `resume()`.');
    }
    if (Tone.Transport.state !== 'stopped') {
      throw new Error(
          'Cannot start playback while `Tone.Transport` is in use.');
    }

    this.resumeContext();
    const isQuantized = sequences.isQuantizedSequence(seq);
    if (this.playClick && isQuantized) {
      seq = this.makeClickSequence(seq);
    }
    if (qpm) {
      Tone.Transport.bpm.value = qpm;
    } else if (seq.tempos && seq.tempos.length > 0 && seq.tempos[0].qpm > 0) {
      Tone.Transport.bpm.value = seq.tempos[0].qpm;
    } else {
      Tone.Transport.bpm.value = constants.DEFAULT_QUARTERS_PER_MINUTE;
    }
    if (isQuantized) {
      seq = sequences.unquantizeSequence(seq, qpm);
    } else if (qpm) {
      throw new Error('Cannot specify a `qpm` for a non-quantized sequence.');
    }

    const thisPart = new Tone.Part((t: number, n: NoteSequence.INote) => {
      // Prevent playback after the part has been removed.
      if (this.currentPart !== thisPart) {
        return;
      }

      this.playNote(t, n);
      
      if (this.callbackObject) {
        Tone.Draw.schedule(() => {
          this.callbackObject.run(n, t);
        }, t);
      }
    }, seq.notes.map((n) => [n.startTime, n]));
    this.currentPart = thisPart;

    if (this.desiredQPM) {
      Tone.Transport.bpm.value = this.desiredQPM;
    }
    this.currentPart.start(undefined /* immediately */, offset);
    if (Tone.Transport.state !== 'started') {
      Tone.Transport.start();
    }
    return new Promise((resolve) => {
      this.scheduledStop = Tone.Transport.schedule(() => {
        this.stop();
        resolve();
        if (this.callbackObject) {
          this.callbackObject.stop();
        }
      }, `+${seq.totalTime}`);
    });
  }

  /**
   * Stop playing the currently playing sequence right away.
   */
  stop() {
    if (this.isPlaying()) {
      this.currentPart.stop();
      Tone.Transport.stop();
      this.currentPart = null;
    }
    Tone.Transport.clear(this.scheduledStop);
    this.scheduledStop = undefined;
    this.desiredQPM = undefined;
  }

  /**
   * Pause playing the currently playing sequence right away. Call resume()
   * to resume.
   * @throws {Error} If the player is stopped.
   */
  pause() {
    if (!this.isPlaying()) {
      throw new Error('Cannot pause playback while the player is stopped.');
    }
    Tone.Transport.pause();
  }

  /**
   * Resume playing the sequence after pause().
   * @throws {Error} If the player is not paused.
   */
  resume() {
    if (this.getPlayState() !== 'paused') {
      throw new Error(`Cannot re