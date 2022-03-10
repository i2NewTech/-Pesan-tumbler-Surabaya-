import * as glob from 'glob';
import * as path from 'path';
import * as webpack from 'webpack';
import * as Terser from 'terser-webpack-plugin';

const src = path.resolve(__di