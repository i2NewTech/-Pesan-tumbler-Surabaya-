/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
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
 * =============================================================================
 *
 * Implementing a custom `Layer` in general involves specifying a `call`
 * function, and possibly also a `computeOutputShape` and `build` function.
 * These layers do not need a custom `build` function because they do not
 * store any variables.
 *
 * Custom layers currently can not be saved / loaded.  Tracking issue at
 * https://github.com/tensorflow/tfjs/issues/254
 */
import * as tf from '@tensorflow/tfjs';

/**
 * Pixel normalization.
 * @param epsilon A small positive number to avoid division by zero.
 */
class PixelNorm extends tf.layers.Layer {
  constructor(public epsilon = 1e-8, public layerConfig = {}) {
    super(layerConfig);
    this.supportsMasking = true;
