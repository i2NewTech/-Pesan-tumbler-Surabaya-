import * as fs from 'fs';
import * as minimist from 'minimist';
import * as path from 'path';

import {baseConfig} from './base.config';

// Allow for specific demos to built with a --demos=<someName>,<someOtherName>
// CLI format.
const args = minimist(process.argv.slice(2));
console.log("-------------", args)
const specified: string[] = args.demos ? args.demos.split(',') : [];

const getDemos = source => {
  return fs.readdirSync(source)
      .filter(name => path.extname(name) === '