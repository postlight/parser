import assert from 'assert'
import cheerio from 'cheerio'

import {
  assertBeforeAndAfter,
  assertClean
} from './test-helpers'
import HTML from '../fixtures/html'

import {
  convertToParagraphs
} from './index'

import { convertNodeTo } from './convert-to-paragraphs'

describe('Generic Extractor Utils', () => {
  describe('convertToParagraphs($)', () => {

    it("performs all conversions", () => {
      assertBeforeAndAfter('convertToParagraphs', convertToParagraphs)
    })

  })

  describe('convertNodeTo(node, $)', () => {
    it('takes a node with any tag and turns it into a P tag', () => {
      const $ = cheerio.load(HTML.convertNodeTo.before)
      const node = $('div').first()

      const result = convertNodeTo(node, $).html()

      assertClean(result, HTML.convertNodeTo.after)
    })

  })

})


