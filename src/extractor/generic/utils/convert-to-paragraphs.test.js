import assert from 'assert'
import cheerio from 'cheerio'

import { clean } from './test-helpers'
import HTML from './fixtures/html'
import {
  convertToParagraphs
} from './index'
import { convertNodeToP } from './convert-to-paragraphs'

describe('Generic Extractor Utils', () => {
  describe('convertToParagraphs($)', () => {

    it("performs all conversions", () => {
      const $ = cheerio.load(HTML.convertToParagraphs.before)
      // Note: Result is not valid html
      // Cheerio's parser will fix this elsewhere
      const result = convertToParagraphs($).html()
      assert.equal(clean(result), clean(HTML.convertToParagraphs.after))
    })

  })

  describe('convertNodeToP(node, $)', () => {
    it('takes a node with any tag and turns it into a P tag', () => {
      const $ = cheerio.load(HTML.convertNodeToP.before)
      const node = $('div').first()
      const result = convertNodeToP(node, $).html()
      assert.equal(clean(result), clean(HTML.convertNodeToP.after))

    })

  })

})


