
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

import {saveAs} from 'file-saver';
import * as mm from '../src/index';
import {sequences} from '../src/core/index';
import {performance} from '../src/core/compat/global';

export const CHECKPOINTS_DIR =
    'https://storage.googleapis.com/magentadata/js/checkpoints';

// Samples from Shan's SGM SoundFont:
// http://www.polyphone-soundfonts.com/en/files/27-instrument-sets/256-sgm-v2-01
export const SOUNDFONT_URL =
    'https://storage.googleapis.com/magentadata/js/soundfonts/sgm_plus';

export const DRUM_SEQS: mm.INoteSequence[] = [
  {
    notes: [
      {pitch: 36, quantizedStartStep: 0}, {pitch: 42, quantizedStartStep: 2},
      {pitch: 36, quantizedStartStep: 4}, {pitch: 42, quantizedStartStep: 6},
      {pitch: 36, quantizedStartStep: 8}, {pitch: 42, quantizedStartStep: 10},
      {pitch: 36, quantizedStartStep: 12}, {pitch: 42, quantizedStartStep: 14},
      {pitch: 36, quantizedStartStep: 16}, {pitch: 36, quantizedStartStep: 24},
      {pitch: 36, quantizedStartStep: 28}, {pitch: 42, quantizedStartStep: 30}
    ],
    quantizationInfo: {stepsPerQuarter: 4},
    totalQuantizedSteps: 32,
  },
  {
    notes: [
      {pitch: 36, quantizedStartStep: 0},  {pitch: 38, quantizedStartStep: 0},
      {pitch: 42, quantizedStartStep: 0},  {pitch: 46, quantizedStartStep: 0},
      {pitch: 42, quantizedStartStep: 2},  {pitch: 42, quantizedStartStep: 3},
      {pitch: 42, quantizedStartStep: 4},  {pitch: 50, quantizedStartStep: 4},
      {pitch: 36, quantizedStartStep: 6},  {pitch: 38, quantizedStartStep: 6},
      {pitch: 42, quantizedStartStep: 6},  {pitch: 45, quantizedStartStep: 6},
      {pitch: 36, quantizedStartStep: 8},  {pitch: 42, quantizedStartStep: 8},
      {pitch: 46, quantizedStartStep: 8},  {pitch: 42, quantizedStartStep: 10},
      {pitch: 48, quantizedStartStep: 10}, {pitch: 50, quantizedStartStep: 10},
      {pitch: 36, quantizedStartStep: 12}, {pitch: 38, quantizedStartStep: 12},
      {pitch: 42, quantizedStartStep: 12}, {pitch: 48, quantizedStartStep: 12},
      {pitch: 50, quantizedStartStep: 13}, {pitch: 42, quantizedStartStep: 14},
      {pitch: 45, quantizedStartStep: 14}, {pitch: 48, quantizedStartStep: 14},
      {pitch: 36, quantizedStartStep: 16}, {pitch: 38, quantizedStartStep: 16},
      {pitch: 42, quantizedStartStep: 16}, {pitch: 46, quantizedStartStep: 16},
      {pitch: 49, quantizedStartStep: 16}, {pitch: 42, quantizedStartStep: 18},
      {pitch: 42, quantizedStartStep: 19}, {pitch: 42, quantizedStartStep: 20},
      {pitch: 50, quantizedStartStep: 20}, {pitch: 36, quantizedStartStep: 22},
      {pitch: 38, quantizedStartStep: 22}, {pitch: 42, quantizedStartStep: 22},
      {pitch: 45, quantizedStartStep: 22}, {pitch: 36, quantizedStartStep: 24},
      {pitch: 42, quantizedStartStep: 24}, {pitch: 46, quantizedStartStep: 24},
      {pitch: 42, quantizedStartStep: 26}, {pitch: 48, quantizedStartStep: 26},
      {pitch: 50, quantizedStartStep: 26}, {pitch: 36, quantizedStartStep: 28},
      {pitch: 38, quantizedStartStep: 28}, {pitch: 42, quantizedStartStep: 28},
      {pitch: 42, quantizedStartStep: 30}, {pitch: 48, quantizedStartStep: 30}
    ],
    quantizationInfo: {stepsPerQuarter: 4},
    totalQuantizedSteps: 32,
  },
  {
    notes: [
      {pitch: 38, quantizedStartStep: 0},  {pitch: 42, quantizedStartStep: 0},
      {pitch: 42, quantizedStartStep: 2},  {pitch: 42, quantizedStartStep: 4},
      {pitch: 36, quantizedStartStep: 6},  {pitch: 38, quantizedStartStep: 6},
      {pitch: 42, quantizedStartStep: 6},  {pitch: 45, quantizedStartStep: 6},
      {pitch: 36, quantizedStartStep: 8},  {pitch: 42, quantizedStartStep: 8},
      {pitch: 42, quantizedStartStep: 10}, {pitch: 38, quantizedStartStep: 12},
      {pitch: 42, quantizedStartStep: 12}, {pitch: 45, quantizedStartStep: 12},
      {pitch: 36, quantizedStartStep: 14}, {pitch: 42, quantizedStartStep: 14},
      {pitch: 46, quantizedStartStep: 14}, {pitch: 36, quantizedStartStep: 16},
      {pitch: 42, quantizedStartStep: 16}, {pitch: 42, quantizedStartStep: 18},
      {pitch: 38, quantizedStartStep: 20}, {pitch: 42, quantizedStartStep: 20},
      {pitch: 45, quantizedStartStep: 20}, {pitch: 36, quantizedStartStep: 22},
      {pitch: 42, quantizedStartStep: 22}, {pitch: 36, quantizedStartStep: 24},
      {pitch: 42, quantizedStartStep: 24}, {pitch: 38, quantizedStartStep: 26},
      {pitch: 42, quantizedStartStep: 26}, {pitch: 45, quantizedStartStep: 26},
      {pitch: 42, quantizedStartStep: 28}, {pitch: 45, quantizedStartStep: 28},
      {pitch: 36, quantizedStartStep: 30}, {pitch: 42, quantizedStartStep: 30},
      {pitch: 45, quantizedStartStep: 30}
    ],
    quantizationInfo: {stepsPerQuarter: 4},
    totalQuantizedSteps: 32,
  },
  {
    notes: [
      {pitch: 50, quantizedStartStep: 4}, {pitch: 50, quantizedStartStep: 20}
    ],
    quantizationInfo: {stepsPerQuarter: 4},
    totalQuantizedSteps: 32,
  }
];
DRUM_SEQS.map(s => s.notes.map(n => {
  n.isDrum = true;
  n.quantizedEndStep = n.quantizedStartStep + 1;
}));

export const MEL_A_QUARTERS: mm.INoteSequence = {
  notes: [
    {pitch: 69, quantizedStartStep: 0, quantizedEndStep: 4, program: 0},
    {pitch: 69, quantizedStartStep: 4, quantizedEndStep: 8, program: 0},
    {pitch: 69, quantizedStartStep: 8, quantizedEndStep: 12, program: 0},
    {pitch: 69, quantizedStartStep: 12, quantizedEndStep: 16, program: 0},
    {pitch: 69, quantizedStartStep: 16, quantizedEndStep: 20, program: 0},
    {pitch: 69, quantizedStartStep: 20, quantizedEndStep: 24, program: 0},
    {pitch: 69, quantizedStartStep: 24, quantizedEndStep: 28, program: 0},
    {pitch: 69, quantizedStartStep: 28, quantizedEndStep: 32, program: 0},
  ],
  quantizationInfo: {stepsPerQuarter: 4},
  totalQuantizedSteps: 32,
};

export const MEL_TEAPOT: mm.INoteSequence = {
  notes: [
    {pitch: 69, quantizedStartStep: 0, quantizedEndStep: 2, program: 0},
    {pitch: 71, quantizedStartStep: 2, quantizedEndStep: 4, program: 0},
    {pitch: 73, quantizedStartStep: 4, quantizedEndStep: 6, program: 0},
    {pitch: 74, quantizedStartStep: 6, quantizedEndStep: 8, program: 0},
    {pitch: 76, quantizedStartStep: 8, quantizedEndStep: 10, program: 0},
    {pitch: 81, quantizedStartStep: 12, quantizedEndStep: 16, program: 0},
    {pitch: 78, quantizedStartStep: 16, quantizedEndStep: 20, program: 0},
    {pitch: 81, quantizedStartStep: 20, quantizedEndStep: 24, program: 0},
    {pitch: 76, quantizedStartStep: 24, quantizedEndStep: 32, program: 0}
  ],
  quantizationInfo: {stepsPerQuarter: 4},
  totalQuantizedSteps: 32,
};

export const MEL_TWINKLE: mm.INoteSequence = {
  notes: [
    {
      pitch: 60,
      quantizedStartStep: 0,
      quantizedEndStep: 2,
      program: 0,
      instrument: 0
    },
    {
      pitch: 60,
      quantizedStartStep: 2,
      quantizedEndStep: 4,
      program: 0,
      instrument: 0
    },
    {
      pitch: 67,
      quantizedStartStep: 4,
      quantizedEndStep: 6,
      program: 0,
      instrument: 0
    },
    {
      pitch: 67,
      quantizedStartStep: 6,
      quantizedEndStep: 8,
      program: 0,
      instrument: 0
    },
    {
      pitch: 69,
      quantizedStartStep: 8,
      quantizedEndStep: 10,
      program: 0,
      instrument: 0
    },
    {
      pitch: 69,
      quantizedStartStep: 10,
      quantizedEndStep: 12,
      program: 0,
      instrument: 0
    },
    {
      pitch: 67,
      quantizedStartStep: 12,
      quantizedEndStep: 16,
      program: 0,
      instrument: 0
    },
    {
      pitch: 65,
      quantizedStartStep: 16,
      quantizedEndStep: 18,
      program: 0,
      instrument: 0
    },
    {
      pitch: 65,
      quantizedStartStep: 18,
      quantizedEndStep: 20,
      program: 0,
      instrument: 0
    },
    {
      pitch: 64,
      quantizedStartStep: 20,
      quantizedEndStep: 22,
      program: 0,
      instrument: 0
    },
    {
      pitch: 64,
      quantizedStartStep: 22,
      quantizedEndStep: 24,
      program: 0,
      instrument: 0
    },
    {
      pitch: 62,
      quantizedStartStep: 24,
      quantizedEndStep: 26,
      program: 0,
      instrument: 0
    },
    {
      pitch: 62,
      quantizedStartStep: 26,
      quantizedEndStep: 28,
      program: 0,
      instrument: 0
    },
    {
      pitch: 60,
      quantizedStartStep: 28,
      quantizedEndStep: 32,
      program: 0,
      instrument: 0
    }
  ],
  quantizationInfo: {stepsPerQuarter: 4},
  totalQuantizedSteps: 32,
};

export const MEL_TWINKLE_WITH_VELOCITIES: mm.INoteSequence = {
  notes: [
    {pitch: 60, quantizedStartStep: 0, quantizedEndStep: 2, velocity: 10},
    {pitch: 60, quantizedStartStep: 2, quantizedEndStep: 4, velocity: 10},
    {pitch: 67, quantizedStartStep: 4, quantizedEndStep: 6, velocity: 30},
    {pitch: 67, quantizedStartStep: 6, quantizedEndStep: 8, velocity: 30},
    {pitch: 69, quantizedStartStep: 8, quantizedEndStep: 10, velocity: 50},
    {pitch: 69, quantizedStartStep: 10, quantizedEndStep: 12, velocity: 50},
    {pitch: 67, quantizedStartStep: 12, quantizedEndStep: 16, velocity: 80},
    {pitch: 65, quantizedStartStep: 16, quantizedEndStep: 18, velocity: 50},
    {pitch: 65, quantizedStartStep: 18, quantizedEndStep: 20, velocity: 50},
    {pitch: 64, quantizedStartStep: 20, quantizedEndStep: 22, velocity: 30},
    {pitch: 64, quantizedStartStep: 22, quantizedEndStep: 24, velocity: 30},
    {pitch: 62, quantizedStartStep: 24, quantizedEndStep: 26, velocity: 10},
    {pitch: 62, quantizedStartStep: 26, quantizedEndStep: 28, velocity: 10},
    {pitch: 60, quantizedStartStep: 28, quantizedEndStep: 32, velocity: 50}
  ],
  quantizationInfo: {stepsPerQuarter: 4},
  totalQuantizedSteps: 32,
};

export const DRUM_SEQ_WITH_VELOCITIES: mm.INoteSequence = {
  notes: [
    {pitch: 36, quantizedStartStep: 0, velocity: 10},
    {pitch: 36, quantizedStartStep: 4, velocity: 80},
    {pitch: 38, quantizedStartStep: 8, velocity: 10},
    {pitch: 38, quantizedStartStep: 12, velocity: 80},
    {pitch: 42, quantizedStartStep: 16, velocity: 10},
    {pitch: 42, quantizedStartStep: 20, velocity: 80},
    {pitch: 45, quantizedStartStep: 24, velocity: 10},
    {pitch: 45, quantizedStartStep: 28, velocity: 80},
    {pitch: 46, quantizedStartStep: 32, velocity: 10},
    // This drum is really unhappy if played too quickly twice in a row.
    {pitch: 46, quantizedStartStep: 38, velocity: 80},
    {pitch: 48, quantizedStartStep: 40, velocity: 10},
    {pitch: 48, quantizedStartStep: 44, velocity: 80},
    {pitch: 49, quantizedStartStep: 48, velocity: 10},
    {pitch: 49, quantizedStartStep: 52, velocity: 80},
    {pitch: 50, quantizedStartStep: 56, velocity: 10},
    {pitch: 50, quantizedStartStep: 60, velocity: 80},
    {pitch: 51, quantizedStartStep: 64, velocity: 10},
    {pitch: 51, quantizedStartStep: 68, velocity: 80},
  ],
  quantizationInfo: {stepsPerQuarter: 4},
  totalQuantizedSteps: 72
};
DRUM_SEQ_WITH_VELOCITIES.notes.map(n => {
  n.isDrum = true;
  n.quantizedEndStep = n.quantizedStartStep + 1;
});

export const FULL_TWINKLE: mm.INoteSequence = {
  notes: [
    {pitch: 60, quantizedStartStep: 0, quantizedEndStep: 2, program: 0},
    {pitch: 60, quantizedStartStep: 2, quantizedEndStep: 4, program: 0},
    {pitch: 67, quantizedStartStep: 4, quantizedEndStep: 6, program: 0},
    {pitch: 67, quantizedStartStep: 6, quantizedEndStep: 8, program: 0},
    {pitch: 69, quantizedStartStep: 8, quantizedEndStep: 10, program: 0},
    {pitch: 69, quantizedStartStep: 10, quantizedEndStep: 12, program: 0},
    {pitch: 67, quantizedStartStep: 12, quantizedEndStep: 16, program: 0},
    {pitch: 65, quantizedStartStep: 16, quantizedEndStep: 18, program: 0},
    {pitch: 65, quantizedStartStep: 18, quantizedEndStep: 20, program: 0},
    {pitch: 64, quantizedStartStep: 20, quantizedEndStep: 22, program: 0},
    {pitch: 64, quantizedStartStep: 22, quantizedEndStep: 24, program: 0},
    {pitch: 62, quantizedStartStep: 24, quantizedEndStep: 26, program: 0},
    {pitch: 62, quantizedStartStep: 26, quantizedEndStep: 28, program: 0},
    {pitch: 60, quantizedStartStep: 28, quantizedEndStep: 32, program: 0},