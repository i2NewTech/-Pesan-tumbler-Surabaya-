#!/bin/bash

# Copyright 2018 Google Inc. All Rights Reserved.
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#    http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

# Regenerates the docs
#
# To run, execute 'yarn docs' in the appropriate package directory.

# Direct usage:
# sh ./generate-docs.sh <package name (music|sketch|image)>

# Exit on error.
set -euo pipefail

PKG_NAME=$1
ORG_NAME="tensorflow"

# Directory/branch variables.
tmpDir=/tmp/${PKG_NAME}_docs
currBranch=$(git rev-parse --abbrev-ref HEAD)
currDir=$(pwd)
baseDir=$(git rev-parse --show-toplevel)

# Generation variables.
urlPrefix="https://github.com/${ORG_NAME}/magenta-js/tree/master/${PKG_NAME}/src/"
keepAfter="/src/"
scriptToFixTheToc=""

if [ $PKG_NAME == "image" ]
then
  urlPrefix="$urlPrefix/arbitrary_stylization/"
  keepAfter="/arbitrary_stylization/"
elif [ $PKG_NAME == "music" ]
then
  # The root index.ts file has a bunch of "export * from './foo';" lines.
  # Parse those lines into a space separated list of names. It's ok that
  # they're space separated, we'll split them in JS, this is all a horror anyway.
  exports=`sed -n "s/export \* from '.\/\(.*\)';/\1/p" $currDir/src/index.ts`
  scriptToFixTheToc="<script> \
const toc = \"$exports\".split(' '); \
const links = document.querySelectorAll('.tsd-kind-external-module'); \
for (let i = 0; i < links.length; i++) { \
  const name = links[i].textContent.trim().replace(/\"/g, ''); \
  if (toc.indexOf(name) === -1) { \
    links[i].parentNode.removeChild(links[i]); \
  } \
} \
</script>"
fi

# Generate the docs.
rm -rf $tmpDir
npx typedoc --options typedoc.json src --out $tmpDir

###
# Here begin the different hacks to fix the docs because typedoc has a lot of bugs.
###

# Typedoc generates documentation for _all_ files, not just the ones
# actually exported in the library, so insert a script to fix the index.html.
# see https://github.com/TypeStrong/typedoc/issues/639
echo $scriptToFixTheToc >> $tmpDir/index.html

# Typedoc has also generated a bunch of 'Defined in <a href="https://github.com/some-user/magenta-js/blob/some-hash/music/src/..."''
# links that we need to change to 'Defined in <a href="${urlPrefix}/...' links.
# We used to be using typedoc-plugin-sourcefile-url to do this, but it stopped
# working at some point and for loops work well enough.
allFiles=$(find $tmpDir -type f -name '*.html')
for path in $allFiles; do
  filename=$(basename $path .html)

  # Fix "Defined in" links.
  if grep -Fq "Defined in" $path; then
    #echo "Fixing Defin