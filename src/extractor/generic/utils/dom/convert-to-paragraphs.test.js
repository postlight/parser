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

import { convertNodeToP } from './convert-to-paragraphs'

describe('Generic Extractor Utils', () => {
  describe('convertToParagraphs($)', () => {

    it("performs all conversions", () => {
      assertBeforeAndAfter('convertToParagraphs', convertToParagraphs)
    })

  })

  describe('convertNodeToP(node, $)', () => {
    it('takes a node with any tag and turns it into a P tag', () => {
      const $ = cheerio.load(HTML.convertNodeToP.before)
      const node = $('div').first()

      const result = convertNodeToP(node, $).html()

      assertClean(result, HTML.convertNodeToP.after)
    })

  })

})


