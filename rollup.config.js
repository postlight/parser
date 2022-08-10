/* eslint-disable import/no-extraneous-dependencies */
import babel from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';

export default {
  input: 'src/mercury.js',
  plugins: [
    commonjs(),
    babel({
      babelHelpers: 'runtime',
    }),
  ],
  treeshake: true,
  output: {
    file: process.env.MERCURY_TEST_BUILD
      ? 'dist/mercury_test.js'
      : 'dist/mercury.js',
    format: 'cjs',
    sourcemap: true,
  },
};
