/* eslint-disable import/no-extraneous-dependencies */
import babel from 'rollup-plugin-babel';
import babelrc from 'babelrc-rollup'; // eslint-disable-line import/extensions
import commonjs from 'rollup-plugin-commonjs';
import nodeResolve from 'rollup-plugin-node-resolve';
import globals from 'rollup-plugin-node-globals';
import json from 'rollup-plugin-json';

const babelOpts = babelrc();
babelOpts.runtimeHelpers = true;
babelOpts.exclude = './node_modules/**';

export default {
  entry: 'src/mercury.web.js',
  plugins: [
    commonjs({
      ignoreGlobal: true,
    }),
    globals(),
    json(),
    babel(babelOpts),
    nodeResolve({
      browser: true,
      preferBuiltins: false,
    }),
  ],
  format: 'iife',
  moduleName: 'Mercury',
  dest: 'dist/mercury.web.js', // equivalent to --output
  sourceMap: true,
};
