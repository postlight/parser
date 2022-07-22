import nodeResolve from 'rollup-plugin-node-resolve';
import globals from 'rollup-plugin-node-globals';
import { terser } from 'rollup-plugin-terser'; // eslint-disable-line import/extensions
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
    terser(),
  ],
  treeshake: true,
  output: {
    file: process.env.MERCURY_TEST_BUILD
      ? 'dist/mercury_test.esm.js'
      : 'dist/mercury.esm.js',
    format: 'es',
    sourceMap: true,
  },
};
