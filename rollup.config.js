import babel from 'rollup-plugin-babel'
import babelrc from 'babelrc-rollup'
import commonjs from 'rollup-plugin-commonjs'

export default {
  entry: 'src/iris.js',
  plugins: [
    commonjs(),
    babel(babelrc()),
  ],
  format: 'cjs',
  dest: 'dist/iris.js', // equivalent to --output
  sourceMap: true,
}
