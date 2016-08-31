import assert from 'assert'
import cheerio from 'cheerio'

import HTML from '../fixtures/html'
import { assertClean } from './test-helpers'

import { cleanImages } from './index'

describe('cleanImages($)', () => {
  it("removes images with small heights/widths", () => {
    let $ = cheerio.load(HTML.cleanSmallImages.before)

    let result = cleanImages($('*').first(), $)
    assertClean(result.html(), HTML.cleanSmallImages.after)
  })

  it("removes height attribute from images that remain", () => {
    let $ = cheerio.load(HTML.cleanHeight.before)

    let result = cleanImages($('*').first(), $)
    assertClean(result.html(), HTML.cleanHeight.after)
  })

  it("removes spacer/transparent images", () => {
    let $ = cheerio.load(HTML.cleanSpacer.before)

    let result = cleanImages($('*').first(), $)
    assertClean(result.html(), HTML.cleanSpacer.after)
  })
})



