import assert from 'assert'

import Iris from './iris'

describe('Iris', function() {
  describe('parse(url)', function() {
    this.timeout(1000000)
    it('does the whole thing', async function() {
      const result = await Iris.parse('http://theconcourse.deadspin.com/phyllis-schlafly-finally-croaks-1786219220')

      // console.log(result)
    })

    it('does blogger', async function() {
      const result = await Iris.parse('https://googleblog.blogspot.com/2016/08/onhub-turns-one-today.html')

      // console.log(result)
    })

    it('does wikipedia', async function() {
      const result = await Iris.parse('https://en.wikipedia.org/wiki/Brihadeeswarar_Temple_fire')

      // console.log(result)
    })
  })
})
