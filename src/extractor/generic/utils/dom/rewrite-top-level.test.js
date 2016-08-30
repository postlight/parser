import assert from 'assert'
import cheerio from 'cheerio'

import HTML from '../fixtures/html'
import { assertClean } from './test-helpers'

import { rewriteTopLevel } from './index'

describe('rewriteTopLevel(node, $)', () => {
  it("turns html and body tags into divs", () => {
    let $ = cheerio.load(HTML.rewriteHTMLBody.before)

    let result = rewriteTopLevel($('html').first(), $)
    assertClean(result.html(), HTML.rewriteHTMLBody.after)
  })
})


