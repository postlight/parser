/* eslint-disable import/no-extraneous-dependencies */
import fs from 'fs';
import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';

const copyDeclarations = (src, dest) => {
  fs.copyFileSync(src, dest);
};

export default {
  input: 'src/mercury.js',
  plugins: [
    commonjs(),
    babel({
      externalHelpers: false,
      runtimeHelpers: true,
    }),
    copyDeclarations('src/mercury.d.ts', 'dist/mercury.d.ts'),
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
