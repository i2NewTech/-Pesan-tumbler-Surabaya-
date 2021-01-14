
/**
 * A module containing a MIDI recorder. Note that WebMIDI only works natively
 * on Chrome. For this to work on other browsers, you need to load
 * the [WebMIDI polyfill]{@link http://cwilso.github.io/WebMIDIAPIShim/}
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
// @ts-ignore
import * as Tone from 'tone';

import {performance} from '../core/compat/global';
import {NoteSequence} from '../protobuf/index';

import {DEFAULT_QUARTERS_PER_MINUTE} from './constants';
import * as logging from './logging';

/**
 * An interface for providing configurable properties to a Recorder.
 * @param qpm The tempo at which to play the click track.
 * @param playClick Whether to play a click track while recording.
 * @param playCountIn Whether to play a count-in click at the beginning of
 * the recording.
 * @param startRecordingAtFirstNote Whether to start the note time offset at
 * the first note received instead of the start of the recording.  Defaults to
 * false.
 */
interface RecorderConfig {
  qpm?: number;
  playClick?: boolean;
  playCountIn?: boolean;
  startRecordingAtFirstNote?: boolean;
}

/**
 * An abstract base class for providing arbitrary callbacks for each note
 * recorded.
 */
export abstract class BaseRecorderCallback {
  /**
   * Will be called for each time a note is recorded.
   *
   * @param seq The note sequence up to this point.
   */
  abstract run(seq: NoteSequence): void;
  /**
   * Will be called for each time a note on event is observed.
   *
   * @param pitch The pitch of the midi event received.
   * @param velocity The velocity of the midi event received.
   * @param device The device the midi event was received from.
   */
  abstract noteOn(pitch: number, velocity: number, device: EventTarget): void;
  /**
   * Will be called for each time a note off event is observed.
   *
   * @param pitch The pitch of the midi event received.
   * @param velocity The velocity of the midi event received.
   * @param device The device the midi event was received from.
   */
  abstract noteOff(pitch: number, velocity: number, device: EventTarget): void;
}

/**
 * Class that records MIDI from any MIDI connected instrument, and converts it
 * to a `NoteSequence`.
 */
export class Recorder {
  public callbackObject: BaseRecorderCallback;
  private config: RecorderConfig;
  private recording: boolean;
  private firstNoteTimestamp: number;
  private notes: NoteSequence.Note[] = [];
  private onNotes: Map<number, NoteSequence.Note>;
  private midiInputs: WebMidi.MIDIInput[] = [];
  private startRecordingAtFirstNote: boolean;

  private loClick = new Tone
                        .MembraneSynth({
                          pitchDecay: 0.008,
                          envelope: {attack: 0.001, decay: 0.3, sustain: 0},
                        })
                        .toDestination();
  private hiClick = new Tone
                        .MembraneSynth({
                          pitchDecay: 0.008,
                          envelope: {attack: 0.001, decay: 0.3, sustain: 0},
                        })
                        .toDestination();
  // tslint:disable-next-line:no-any
  private clickLoop: any;

  /**
   * `Recorder` constructor.
   *
   * @param callbackObject An optional BasePlayerCallback, specifies an
   * object that contains run() and stop() methods to invode during
   * playback.
   */
  constructor(
      config = {} as RecorderConfig, callbackObject?: BaseRecorderCallback) {