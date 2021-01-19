
/**
 * Module for loading and playing SoundFont instrument samples.
 *
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

/**
 * Imports
 */
import * as Tone from 'tone';

import {fetch} from '../core/compat/global';

import * as constants from './constants';
import * as logging from './logging';

/**
 * Instrument sample pitch and velocity.
 */
export interface SampleInfo {
  pitch: number;
  velocity: number;
}

/**
 * Specification for a sampled instrument. Samples must exist for all pitches
 * between `minPitch` and `maxPitch` at all velocities in `velocities` (unless
 * `velocities` is undefined, in which case only a single sample exists for each
 * pitch). Each sample consists of a note sustained for `durationSeconds` then
 * released, ending after `releaseSeconds` additional seconds.
 *
 * @param name Name of the instrument.
 * @param minPitch The minimum MIDI pitch sampled.
 * @param maxPitch The maximum MIDI pitch sampled.
 * @param durationSeconds Length of each sample in seconds, not including the
 * release.
 * @param releaseSeconds Length of the release for each sample in seconds.
 * @param percussive If true, the sample is considered percussive and will
 * always be played in its entirety.
 * @param velocities (Optional) The set of velocities sampled.
 */
export interface InstrumentSpec {
  name: string;
  minPitch: number;
  maxPitch: number;
  durationSeconds: number;
  releaseSeconds: number;
  percussive: boolean;
  velocities?: number[];
}

/**
 * Sampled instrument. Must be initialized and samples must be pre-loaded using
 * the `loadSamples` method before any notes can be played.
 */
export class Instrument {
  private FADE_SECONDS = 0.1;

  private readonly baseURL: string;
  private readonly buffers: any;  // tslint:disable-line:no-any

  private initialized: boolean;

  name: string;
  minPitch: number;
  maxPitch: number;
  durationSeconds: number;
  releaseSeconds: number;
  percussive: boolean;
  velocities?: number[];
  sourceMap: Map<number, any>;  // tslint:disable-line:no-any

  /**
   * `Instrument` constructor.
   *
   * @param baseURL Path to the instrument directory.
   */
  constructor(baseURL: string) {
    this.baseURL = baseURL;
    this.buffers = new Tone.ToneAudioBuffers();
    this.sourceMap = new Map<number, any>();  // tslint:disable-line:no-any
    this.initialized = false;
  }

  /**
   * Loads instrument configuration from an `instrument.json` file in the base
   * URL directory. Does not load any of the samples.
   */
  async initialize() {
    await fetch(`${this.baseURL}/instrument.json`)
        .then((response) => response.json())
        .then((spec: InstrumentSpec) => {
          this.name = spec.name;
          this.minPitch = spec.minPitch;
          this.maxPitch = spec.maxPitch;
          this.durationSeconds = spec.durationSeconds;
          this.releaseSeconds = spec.releaseSeconds;
          this.percussive = spec.percussive;