import assert from 'assert'
import cheerio from 'cheerio'

import convertNodeTo from './convert-node-to'

describe('convertNodeTo(node, $)', () => {
  it('takes a node and converts it to a diff tag', () => {
    const html = '<div>Should become a p</div>'
    const $ = cheerio.load(html)
    const node = $('div').first()

    const result = convertNodeTo(node, $).html()
    const after = '<p>Should become a p</p>'

    assert.equal(result, after)
  })

})


