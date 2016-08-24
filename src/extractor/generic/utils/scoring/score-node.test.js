import assert from 'assert'
import cheerio from 'cheerio'

import HTML from './fixtures/html'

import {
  scoreNode,
  scoreParagraph,
} from './index'


describe('scoreNode(node)', () => {
  it(`scores P, LI, SPAN, and PRE using scoreParagraph`, () => {
    const html = '<p><em>Foo</em> bar</p>'
    const $ = cheerio.load(html)
    let node = $('p').first()

    const score = scoreNode(node)
    const pScore = scoreParagraph(node)

    assert.equal(score, pScore)
    assert.equal(score, 0)
  })

  it(`scores P, LI, SPAN, and PRE using scoreParagraph`, () => {
    const $ = cheerio.load(HTML.score1)
    let node = $('p').first()

    const score = scoreNode(node)
    const pScore = scoreParagraph(node)

    assert.equal(score, pScore)
    assert.equal(score, 1)

  })

  it(`scores P, LI, SPAN, and PRE using scoreParagraph`, () => {
    const $ = cheerio.load(HTML.score3)
    let node = $('p').first()

    const score = scoreNode(node)
    const pScore = scoreParagraph(node)

    assert.equal(score, pScore)
    assert.equal(score, 3)
  })

  it(`scores P, LI, SPAN, and PRE using scoreParagraph`, () => {
    const $ = cheerio.load(HTML.score19)
    let node = $('p').first()

    const score = scoreNode(node)
    const pScore = scoreParagraph(node)

    assert.equal(score, pScore)
    assert.equal(score, 19)
  })

  it(`scores divs with 5`, () => {
    const $ = cheerio.load(HTML.divScore5)
    let node = $('div').first()

    const score = scoreNode(node)

    assert.equal(score, 5)
  })

  it(`scores the blockquote family with 3`, () => {
    const $ = cheerio.load(HTML.blockquoteScore3)
    let node = $('blockquote').first()

    const score = scoreNode(node)

    assert.equal(score, 3)
  })

  it(`scores a form with negative 3`, () => {
    const $ = cheerio.load(HTML.formScoreNeg3)
    let node = $('form').first()

    const score = scoreNode(node)

    assert.equal(score, -3)
  })

  it(`scores a TH element with negative 5`, () => {
    const $ = cheerio.load(HTML.thScoreNeg5)
    let node = $('th').first()

    const score = scoreNode(node)

    assert.equal(score, -5)
  })
})

