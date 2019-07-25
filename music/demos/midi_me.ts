/**
 * @license
 * Copyright 2019 Google Inc. All Rights Reserved.
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

import * as tf from '@tensorflow/tfjs';

import * as mm from '../src/index';
import {performance} from '../src/core/compat/global';
import {blobToNoteSequence, MidiMe, MusicVAE, NoteSequence} from '../src/index';
import {quantizeNoteSequence} from '../src/core/sequences';

// tslint:disable-next-line:max-line-length
import {CHECKPOINTS_DIR, visualizeNoteSeqs, writeTimer} from './common';
import {updateGraph} from './common_graph';

const MEL_CKPT = `${CHECKPOINTS_DIR}/music_vae/mel_2bar_small`;
const TRIO_CKPT = `${CHECKPOINTS_DIR}/music_vae/trio_4bar`;
const MEL_BARS = 2;
const TRIO_BARS = 4;

// Event listeners.
const melFileInput =
    document.getElementById('mel_fileInput') as HTMLInputElement;
melFileInput.addEventListener('change', () => loadFile(melFileInput, 'mel'));
const trioFileInput =
    document.getElementById('trio_fileInput') as HTMLInputElement;
trioFileInput.addEventListener('change', () => loadFile(trioFileInput, 'trio'));

document.getElementById('mel_train').addEventListener('click', trainMelody);
document.getElementById('trio_train').addEventListener('click', trainTrio);

// Initialize models.
const mvae = new mm.MusicVAE(MEL_CKPT);
mvae.initialize().then(() => {
  document.getElementById('mel_fileBtn').removeAttribute('disabled');
});
const triovae = new mm.MusicVAE(TRIO_CKPT);
mvae.initialize().then(() => {
  document.getElementById('trio_fileBtn').removeAttribute('disabled');
});

const melModel = new mm.MidiMe({epochs: 100});
melModel.initialize();
const trioModel = new mm.MidiMe({epochs: 300});
trioModel.initialize();

// Where we will store the loaded input so that we can train on it.
let inputMelodies: NoteSequence[] = [];
let inputTrios: NoteSequence[] = [];

function loadFile(inputElement: HTMLInputElement, prefix: string) {
  document.getElementById(`${prefix}_fileBtn`).setAttribute('disabled', '');
  const promises = [];
  for (let i = 0; i < inputElement.files.length; i++) {
    promises.push(blobToNoteSequence(inputElement.files[i]));
  }
  Promise.all(promises).then((mels) => {
    if (prefix === 'mel') {
      inputMelodies = mels;
    } else {
      inputTrios = mels;
    }
    visualizeNoteSeqs(`${prefix}_input`, mels, true);
    document.getElementById(`${prefix}_train`).removeAttribute('disabled');
  });
}

function trainMelody() {
  train(inputMelodies, mvae, melModel, 'mel');
}
function trainTrio() {
  train(inputTrios, triovae, trioModel, 'trio');
}

async function train(
    mel: NoteSequence[], vae: MusicVAE, midime: MidiMe, prefix: string) {
  const start = performance.now();

  // 1. Encode the input into MusicVAE, get back a z.
  const quantizedMels: NoteSequence[] = [];
  mel.forEach((m) => quantizedMels.push(quantizeNoteSequence(m, 4)));

  // 1b. Split this sequence into 32 bar chunks.
  let chunks: NoteSequence[] = [];
  quantizedMels.forEach((m) => {
    const length = pr