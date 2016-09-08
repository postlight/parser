import assert from 'assert'

import Iris from './iris'

describe('Iris', function() {
  describe('parse(url)', function() {
    this.timeout(1000000)
    it('does the whole thing', async function() {
      const result = await Iris.parse('http://theconcourse.deadspin.com/phyllis-schlafly-finally-croaks-1786219220')

      // console.log(result)
    })
  })
})
