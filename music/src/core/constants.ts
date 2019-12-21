
/**
 * Global constants.
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
 * Null comment for documentation generation.
 */
null;  // tslint:disable-line:no-unused-expression

export const DEFAULT_QUARTERS_PER_MINUTE = 120.0;
// 4/4 music sampled at 4 steps per quarter note.
export const DEFAULT_STEPS_PER_BAR = 16;
export const DEFAULT_STEPS_PER_QUARTER = 4;

// Default absolute quantization.
export const DEFAULT_STEPS_PER_SECOND = 100;

export const DEFAULT_VELOCITY = 80;
export const DEFAULT_PROGRAM = 0;
export const DEFAULT_TICKS_PER_QUARTER = 220;
export const DEFAULT_CHANNEL = 0;
export const DRUM_CHANNEL = 9;
export const NON_DRUM_CHANNELS : ReadonlyArray<number> =
    [0, 1, 2, 3, 4, 5, 6, 7, 8, 10, 11, 12, 13, 14, 15];