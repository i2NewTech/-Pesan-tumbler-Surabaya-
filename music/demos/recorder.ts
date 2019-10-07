import * as mm from '../src/index';
import {writeNoteSeqs} from './common';

const recorder = new mm.Recorder();
const recordBtn = document.getElementById('record') as HTMLButtonElement;
const stopBtn = document.getElementById('stop') as HTMLButtonElement;
const startStreamBtn =
    document.getElementById('startStream') as HTMLButtonElement;
const stopStreamBtnBtn =
    document.getElementById('stopStream') as HTMLButtonElement;
const tempoSlider = document.getElementById('tempo') as HTMLInputElement;
const clickCheckbox = document.getElementById('playClick') as HTMLInputElement;
