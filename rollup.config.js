import babel from '@rollup/plugin-babel';
import typescript from '@rollup/plugin-typescript';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import del from 'rollup-plugin-delete';

export default {
  input: 'src/mercury.ts',
  plugins: [
    del({ targets: 'dist/*' }),
    nodeResolve({
      preferBuiltins: true,
    }),
    commonjs(),
    json(),
    typescript({ tsconfig: './tsconfig.json' }),
    babel({
      babelHelpers: 'runtime',
      // https://github.com/rollup/plugins/issues/381
      exclude: '**/node_modules/**',
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
