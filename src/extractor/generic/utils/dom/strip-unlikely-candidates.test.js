import assert from 'assert'
import cheerio from 'cheerio'

import { clean } from './test-helpers'
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
      const $ = cheerio.load(HTML.whitelistMatch.before)
      const stripped = clean(stripUnlikelyCandidates($).html())
      assert.equal(stripped, clean(HTML.whitelistMatch.after))
    })

    it("keeps likely matches even when they also match the blacklist", () => {
      const $ = cheerio.load(HTML.whiteAndBlack.before)
      const stripped = clean(stripUnlikelyCandidates($).html())
      assert.equal(stripped, clean(HTML.whiteAndBlack.after))
    })

    it("removed likely matches when inside blacklist node", () => {
      const $ = cheerio.load(HTML.whiteInsideBlack.before)
      const stripped = clean(stripUnlikelyCandidates($).html())
      assert.equal(stripped, clean(HTML.whiteInsideBlack.after))
    })


  })
})

