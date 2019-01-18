import nodeResolve from 'rollup-plugin-node-resolve';
import globals from 'rollup-plugin-node-globals';
import { uglify } from 'rollup-plugin-uglify'; // eslint-disable-line import/extensions
import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';

export default {
  input: 'src/mercury.js',
  plugins: [
    babel({
      runtimeHelpers: true,
      exclude: './node_modules#<{(|*',
    }),
    commonjs({
      ignoreGlobal: true,
    }),
    globals(),
    nodeResolve({
      browser: true,
      preferBuiltins: false,
    }),
    uglify(),
  ],
  treeshake: true,
  output: {
    file: process.env.MERCURY_TEST_BUILD
      ? 'dist/mercury_test.web.js'
      : 'dist/mercury.web.js',
    format: 'iife',
    name: 'Mercury',
    sourceMap: true,
  },
};
