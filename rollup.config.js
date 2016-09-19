import babel from 'rollup-plugin-babel'
import babelrc from 'babelrc-rollup'
import commonjs from 'rollup-plugin-commonjs'

let babelOpts = babelrc()
babelOpts.runtimeHelpers = true

export default {
  entry: 'src/mercury.js',
  plugins: [
    commonjs(),
    babel(babelOpts),
  ],
  format: 'cjs',
  dest: 'dist/mercury.js', // equivalent to --output
  sourceMap: true,
}
