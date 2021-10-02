/* eslint-disable import/no-extraneous-dependencies */
import babel from 'rollup-plugin-babel';
import typescript from '@rollup/plugin-typescript';

export default {
  input: 'src/mercury.ts',
  plugins: [
    typescript(),
    babel({
      externalHelpers: false,
      runtimeHelpers: true,
    }),
  ],
  treeshake: true,
  output: {
    file: process.env.MERCURY_TEST_BUILD
      ? 'dist/mercury_test.js'
      : 'dist/mercury.js',
    format: 'cjs',
    sourceMap: true,
  },
};
