import { nodeResolve } from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import nodePolyfills from 'rollup-plugin-polyfill-node';
import { uglify } from 'rollup-plugin-uglify'; // eslint-disable-line import/extensions
import babel from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';

export default {
  input: 'src/mercury.ts',
  plugins: [
    nodePolyfills(),
    nodeResolve({ browser: true, preferBuiltins: false }),
    commonjs(),
    json(),
    typescript({ tsconfig: './tsconfig.json' }),
    babel({
      babelHelpers: 'runtime',
      // https://github.com/rollup/plugins/issues/381
      exclude: '**/node_modules/**',
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
    sourcemap: true,
  },
};
