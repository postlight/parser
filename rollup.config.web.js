// #<{(| eslint-disable import/no-extraneous-dependencies |)}>#
// import babel from 'rollup-plugin-babel';
// import babelrc from 'babelrc-rollup'; // eslint-disable-line import/extensions
// import commonjs from 'rollup-plugin-commonjs';
import nodeResolve from 'rollup-plugin-node-resolve';
import globals from 'rollup-plugin-node-globals';
// import { uglify } from 'rollup-plugin-uglify'; // eslint-disable-line import/extensions
//
// const babelOpts = babelrc();
// babelOpts.runtimeHelpers = true;
// babelOpts.exclude = './node_modules#<{(|*';
//
// export default {
//   entry: 'src/mercury.js',
//   plugins: [
//     babel(babelOpts),
//     commonjs({
//       ignoreGlobal: true,
//     }),
//     globals(),
//     nodeResolve({
//       browser: true,
//       preferBuiltins: false,
//     }),
//     uglify(),
//   ],
//   format: 'iife',
//   moduleName: 'Mercury',
//   dest: process.env.MERCURY_TEST_BUILD ? 'dist/mercury_test.web.js' : 'dist/mercury.web.js',
//   sourceMap: false,
// };
/* eslint-disable import/no-extraneous-dependencies */
import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';

// const babelOpts = babelrc();
// console.log(`babelOpts`, babelOpts);
// babelOpts.runtimeHelpers = false;

export default {
  input: 'src/mercury.js',
  plugins: [
    babel({
      runtimeHelpers: true,
      exclude: 'node_modules/**',
    }),
    commonjs({
      ignoreGlobal: true,
    }),
    globals(),
    nodeResolve({
      browser: true,
      preferBuiltins: false,
    }),
    // uglify(),
  ],
  output: {
    file: process.env.MERCURY_TEST_BUILD
      ? 'dist/mercury_test.web.js'
      : 'dist/mercury.web.js',
    format: 'iife',
    name: 'Mercury',
    sourceMap: true,
  },
};
