import babel from 'rollup-plugin-babel'
import babelrc from 'babelrc-rollup'
import commonjs from 'rollup-plugin-commonjs'

export default {
  entry: 'src/index.js',
  plugins: [
    commonjs(),
    babel(babelrc()),
  ],
  format: 'cjs',
  dest: 'dist/bundle.js' // equivalent to --output
}
