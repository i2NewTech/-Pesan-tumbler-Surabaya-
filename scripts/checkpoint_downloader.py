# Copyright 2018 Google Inc. All Rights Reserved.
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#     http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.
# ==============================================================================

"""
Download all necessary files from a Magenta.js checkpoint URL.

Example usage:

$ python checkpoint_downloader /checkpoint/url/ /path/to/output
"""
from __future__ import absolute_import
from __future__ import division
from __future__ import print_function

from future.moves.urllib.request import urlopen, Request
from future.moves.urllib.error import HTTPError

import argparse
import json
import os


MANIFEST_FNAME = 'weights_manifest.json'
CONFIG_FNAME = 'config.json'

def _join_url(*parts):
  return '/'.join(parts)

def download_checkpoint(checkpoint_url, output_dir):
  try:
    response = urlopen(_join_url(checkpoint_url, MANIFEST_FNAME))
  except HTTPError as e:
    print(_join_url(