import assert from 'assert'
import cheerio from 'cheerio'

import HTML from './fixtures/html'
import { cleanTitle } from './index'

describe('cleanTitle(title, $)', () => {
  it('uses a single h1 if the title is too short or too long', () => {
    const title = "Too Short"
    const $ = cheerio.load(HTML.docWithH1)

    assert.equal(cleanTitle(title, '', $), $('h1').text())
  })

  it('only uses h1 if there is only one on the page', () => {
    const title = "Too Short"
    const $ = cheerio.load(HTML.docWith2H1s)

    assert.equal(cleanTitle(title, '', $), title)
  })

  it('removes HTML tags from titles', () => {
    const title = "Too Short"
    const $ = cheerio.load(HTML.docWithTagsInH1.before)

    assert.equal(cleanTitle(title, '', $), HTML.docWithTagsInH1.after)
  })

  it('trims extraneous spaces', () => {
    const title = " This Is a Great Title That You'll Love "
    const $ = cheerio.load(HTML.docWithTagsInH1.before)

    assert.equal(cleanTitle(title, '', $), title.trim())
  })

})

