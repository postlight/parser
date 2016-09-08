import assert from 'assert'
import cheerio from 'cheerio'

import HTML from './fixtures/html'

import { normalizeSpaces } from './index'

describe('normalizeSpaces(text)', () => {
  it("normalizes spaces from text", () => {
    let $ = cheerio.load(HTML.normalizeSpaces.before)

    let result = normalizeSpaces($('*').first().text())
    assert.equal(result, HTML.normalizeSpaces.after)
  })

})
