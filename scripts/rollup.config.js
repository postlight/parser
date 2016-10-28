/* eslint-disable import/no-extraneous-dependencies */
import babel from 'rollup-plugin-babel';
import babelrc from 'babelrc-rollup'; // eslint-disable-line import/extensions
import commonjs from 'rollup-plugin-commonjs';

const babelOpts = babelrc();
babelOpts.runtimeHelpers = true;

export default {
  entry: './scripts/generate-custom-parser.js',
  plugins: [
    commonjs(),
    babel(babelOpts),
  ],
  format: 'cjs',
  dest: 'dist/generate-custom-parser.js', // equivalent to --output
  sourceMap: true,
};
