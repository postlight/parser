/* eslint-disable import/no-extraneous-dependencies */
import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';

// const babelOpts = babelrc();
// console.log(`babelOpts`, babelOpts);
// babelOpts.runtimeHelpers = false;

export default {
  input: 'src/mercury.js',
  plugins: [
    commonjs(),
    babel({
      externalHelpers: false,
      runtimeHelpers: true,
    }),
  ],
  // format: 'cjs',
  output: {
    file: process.env.MERCURY_TEST_BUILD
      ? 'dist/mercury_test.js'
      : 'dist/mercury.js',
    format: 'cjs',
    sourceMap: true,
  },
};
