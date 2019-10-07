import * as mm from '../src/index';
import {writeNoteSeqs} from './common';

const recorder = new mm.Recorder();
const recordBtn = document.getElementById('record') as HTMLButtonElement;
const stopBtn = document.getElementById('stop') as HTMLButtonEl