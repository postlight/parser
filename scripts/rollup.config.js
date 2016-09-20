import babel from 'rollup-plugin-babel';
import babelrc from 'babelrc-rollup';
import commonjs from 'rollup-plugin-commonjs';

export default {
  entry: './scripts/generate-custom-parser.js',
  plugins: [
    commonjs(),
    babel(babelrc()),
  ],
  format: 'cjs',
  dest: 'dist/generate-custom-parser.js', // equivalent to --output
  sourceMap: true,
};
