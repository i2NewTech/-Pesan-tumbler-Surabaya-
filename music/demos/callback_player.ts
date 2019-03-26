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
      document.getElementById('drum7'), document.getElementById('drum8'),
      document.getElementById('drum9')
    ];
    this.keyDivs = [
      [
        document.getElementById('top_c'), document.getElementById('bottom_c'),
        document.getElementById('right_bottom_c')
      ],
      [document.getElementById('c_sharp')],
      [
        document.getElementById('top_d'),
        document.getElementById('left_bottom_d'),
        document.getElementById('bottom_d'),
        document.getElementById('right_bottom_d')
      ],
      [document.getElementById('d_sharp')],
      [
        document.getElementById('top_e'),
        document.getElementById('left_bottom_e'),
        document.getElementById('bottom_e')
      ],
      [
        document.getElementById('top_f'), document.getElementById('bottom_f'),
        document.getElementById('right_bottom_f')
      ],
      [document.getElementById('f_sharp')],
      [
        document.getElementById('top_g'),
        document.getElementById('left_bottom_g'),
        document.getElementById('bottom_g'),
        document.getElementById('right_bottom_g')
      ],
      [document.getElementById('g_sharp')],
      [
        document.getElementById('top_a'),
        document.getElementById('left_bottom_a'),
        document.getElementById('bottom_a'),
        document.getElementById('right_bottom_a')
      ],
      [document.getElementById('a_sharp')],
      [
        documen