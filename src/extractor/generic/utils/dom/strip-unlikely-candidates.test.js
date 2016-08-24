import assert from 'assert'
import cheerio from 'cheerio'

import { assertBeforeAndAfter } from './test-helpers'
import HTML from '../fixtures/html'
import {
  stripUnlikelyCandidates
} from './index'

describe('Generic Extractor Utils', () => {
  describe('stripUnlikelyCandidates(node)', () => {
    it("returns original doc if no matches found", () => {
      const $ = cheerio.load(HTML.noMatches)
      const stripped = stripUnlikelyCandidates($)
      assert.equal(stripped.html(), HTML.noMatches)
    })

    it("strips unlikely matches from the doc", () => {
      assertBeforeAndAfter('whitelistMatch', stripUnlikelyCandidates)
    })

    it("keeps likely matches even when they also match the blacklist", () => {
      assertBeforeAndAfter('whiteAndBlack', stripUnlikelyCandidates)
    })

    it("removed likely matches when inside blacklist node", () => {
      assertBeforeAndAfter('whiteInsideBlack', stripUnlikelyCandidates)
    })


  })
})

