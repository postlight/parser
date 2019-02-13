/* eslint-disable import/no-extraneous-dependencies */
import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';

export default {
  input: 'scripts/generate-custom-parser.js',
  plugins: [
    commonjs(),
    babel({
      externalHelpers: false,
      runtimeHelpers: true,
    }),
  ],
  treeshake: true,
  output: {
    file: 'dist/generate-custom-parser.js',
    format: 'cjs',
    sourceMap: true,
  },
};
