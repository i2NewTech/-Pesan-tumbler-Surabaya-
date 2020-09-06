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

function compareQuantizedNotes(a: NoteSequence.INote, 