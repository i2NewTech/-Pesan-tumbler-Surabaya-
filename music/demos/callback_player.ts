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

import * as mm from '../src/index';
import {DRUM_SEQS, MEL_TEAPOT, MEL_TWINKLE} from './common';

class MetronomeCallback extends mm.BasePlayerCallback {
  private drumClickDivs: HTMLElement[];
  private pianoClickDivs: HTMLElement[];
  private drumDivs: HTMLElement[];
  private keyDivs: HTMLElement[][];
  private beatPos: number;
  private currentDrum: number;
  private drumPitchToClass: Map<number, number>;

  constructor() {
    super();
    this.drumClickDivs = [
      document.getElementById('drumClick1'),
      document.getElementById('drumClick2'),
      document.getElementById('drumClick3'),
      document.getElementById('drumClick4')
    ];
    this.pianoClickDivs = [
      document.getElementById('pianoClick1'),
      document.getElementById('pianoClick2'),
      document.getElementById('pianoClick3'),
      document.getElementById('pianoClick4')
    ];
    this.drumDivs = [
      document.getElementById('drum1'), document.getElementById('drum2'),
      document.getElementById('drum3'), document.getElementById('drum4'),
      document.getElementById('drum5'), document.getElementById('drum6'),
   