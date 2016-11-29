/* eslint-disable import/no-extraneous-dependencies */
import babel from 'rollup-plugin-babel';
import babelrc from 'babelrc-rollup'; // eslint-disable-line import/extensions
import commonjs from 'rollup-plugin-commonjs';

const babelOpts = babelrc();
babelOpts.runtimeHelpers = true;

export default {
  entry: 'src/mercury.js',
  plugins: [
    commonjs(),
    babel(babelOpts),
  ],
  format: 'cjs',
  dest: process.env.MERCURY_TEST_BUILD ? 'dist/mercury.test.js' : 'dist/mercury.js',
  sourceMap: true,
};
