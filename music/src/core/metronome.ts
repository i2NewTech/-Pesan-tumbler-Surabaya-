/**
 * A module containing a metronome based on Tone.js. The timing is done
 * using the underlying WebAudio clock, so it is accurate, and the metronome
 * fires callbacks for every audible click, quarter and bar marks.
 *
 * @license
 * Copyright 2012 Google Inc. All Rights Reserved.
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
const QUARTERS_PER_BAR = 4;

/**
 * An abstract base class for providing arbitrary callbacks for the metronome.
 */
export abstract class MetronomeCallbackObject {
  /**
   * Will be called for every audible click made. There will be
   * `clicksPerQuarter` of this callback for every quarter() callback.
   *
   * @param time The offset time from the metronome's start.
   * @param index The index of the click in the bar (0 <= index <
   * 4 * `clicksPerQuarter`).
   */
  abstract click(time: number, index: number): void;

  /**
   * Will be called for every quarter note that has clicked. There will be
   * 4 of this callback for every bar() callback.
   *
   * @param time The offset time from the metronome's start.
   * @param index The index of the quarter in the bar (0 <= index < 4).
   */
  abstract quarter(time: number, index: number): void;

  /**
   * Will be called for every bar that has clicked.
   *
   * @param time The offset time from the metronome's start.
   * @param index The index of the bar (0 <= index).
   */
  abstract