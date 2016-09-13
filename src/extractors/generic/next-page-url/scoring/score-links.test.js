import assert from 'assert'
import cheerio from 'cheerio'
import fs from 'fs'
import URL from 'url'

import scoreLinks from './score-links'
import {
  makeBaseRegex,
  scoreBaseUrl,
  scoreNextLinkText,
  scoreCapLinks,
  scorePrevLink,
  scoreByParents,
  scoreExtraneousLinks,
  scorePageInLink,
  scoreLinkText,
  scoreSimilarity,
  shouldScore,
} from './score-links'

describe('scoreLinks(links)', () => {
  it('returns an object of scored links', () => {
    const html = fs.readFileSync('./fixtures/ars.html', 'utf8')

    const $ = cheerio.load(html)
    const links = $('a[href]').toArray()
    const url = 'http://arstechnica.com/gadgets/2016/08/the-connected-renter-how-to-make-your-apartment-smarter/'

    const scoredPages = scoreLinks({
      links,
      articleUrl: url,
      baseUrl: 'http://arstechnica.com',
      $,
    })

    assert.equal(typeof scoredPages, 'object')
  })

  it('returns null if no possible pages', () => {
    const html = `<div><p>Hello wow</p></div>`

    const $ = cheerio.load(html)
    const links = $('a[href]').toArray()
    const url = 'http://arstechnica.com/gadgets/2016/08/the-connected-renter-how-to-make-your-apartment-smarter/'

    const scoredPages = scoreLinks({
      links,
      articleUrl: url,
      baseUrl: 'http://arstechnica.com',
      $,
    })

    assert.equal(scoredPages, null)
  })
})

describe('scoreBaseUrl(href, baseRegex)', () => {
  it('returns -25 if url does not contain the base url', () => {
    const baseUrl = 'http://example.com/foo/bar'
    const badUrl = 'http://foo.com/foo/bar'
    const baseRegex = makeBaseRegex(baseUrl)

    assert.equal(scoreBaseUrl(badUrl, baseRegex), -25)
  })

  it('returns 0 if url contains the base url', () => {
    const baseUrl = 'http://example.com/foo/bar'
    const badUrl = 'http://example.com/foo/bar/bat'
    const baseRegex = makeBaseRegex(baseUrl)

    assert.equal(scoreBaseUrl(badUrl, baseRegex), 0)
  })
})

describe('scoreNextLinkText(linkData)', () => {
  it('returns 50 if contains common next link text', () => {
    const linkData = "foo bar Next page"

    assert.equal(scoreNextLinkText(linkData), 50)
  })

  it('returns 0 if does not contain common next link text', () => {
    const linkData = "foo bar WOW GREAT"

    assert.equal(scoreNextLinkText(linkData), 0)
  })
})

describe('scoreCapLinks(linkData)', () => {
  it('returns -65 if cap link with next link text', () => {
    const linkData = "foo next Last page"

    assert.equal(scoreCapLinks(linkData), -65)
  })

  it('returns 0 if does not match a cap link', () => {
    const linkData = "foo bar WOW GREAT"

    assert.equal(scoreCapLinks(linkData), 0)
  })
})

describe('scorePrevLink(linkData)', () => {
  it('returns -200 if link matches previous text', () => {
    const linkData = "foo next previous page"

    assert.equal(scorePrevLink(linkData), -200)
  })

  it('returns 0 if does not match a prev link', () => {
    const linkData = "foo bar WOW GREAT"

    assert.equal(scoreCapLinks(linkData), 0)
  })
})

describe('scoreByParents($link)', () => {
  it('returns 25 if parent sig looks like a page', () => {
    const html = `
      <div>
        <div class="next-page">
          <a href="blah">Next page</a>
        </div>
      </div>
    `
    const $ = cheerio.load(html)
    const $link = $('a').first()

    assert.equal(scoreByParents($link), 25)
  })

  it('returns -25 if parent sig looks like a comment', () => {
    const html = `
      <div>
        <div class="comment">
          <a href="blah">Next page</a>
        </div>
      </div>
    `
    const $ = cheerio.load(html)
    const $link = $('a').first()

    assert.equal(scoreByParents($link), -25)
  })

})

describe('scoreExtraneousLinks(href)', () => {
  it('returns -25 if link matches extraneous text', () => {
    const url = "http://example.com/email-link"

    assert.equal(scoreExtraneousLinks(url), -25)
  })

  it('returns 0 if does not match extraneous text', () => {
    const url = "http://example.com/asdf"

    assert.equal(scoreExtraneousLinks(url), 0)
  })
})

describe('scorePageInLink(pageNum, isWp)', () => {
  it('returns 50 if link contains a page num', () => {
    assert.equal(scorePageInLink(1, false), 50)
  })

  it('returns 0 if link contains no page num', () => {
    assert.equal(scorePageInLink(null, false), 0)
  })

  it('returns 0 if page is wordpress', () => {
    assert.equal(scorePageInLink(10, true), 0)
  })

})

describe('scoreLinkText(linkText)', () => {
  it('returns 8 if link contains the num 2', () => {
    assert.equal(scoreLinkText('2', 0), 8)
  })

  it('returns 5 if link contains the num 5', () => {
    assert.equal(scoreLinkText('5', 0), 5)
  })

  it('returns -30 if link contains the number 1', () => {
    assert.equal(scoreLinkText('1', 0), -30)
  })

  it('penalizes -50 if pageNum is >= link text as num', () => {
    assert.equal(scoreLinkText('4', 5), -44)
  })

})

describe('scoreSimilarity(score, articleUrl, href)', () => {
  it('returns a similarity bonus based on current score', () => {
    const articleUrl = 'http://example.com/foo/bar'
    const href = 'http://example.com/foo/bar/2'
    const score = 25
    assert.equal(
      Math.round(scoreSimilarity(score, articleUrl, href)),
      66
    )
  })

  it('returns 0 is current score <= 0', () => {
    const articleUrl = 'http://example.com/foo/bar'
    const href = 'http://example.com/foo/bar/2'
    const score = 0
    assert.equal(scoreSimilarity(score, articleUrl, href), 0)
  })

})

describe('shouldScore(href, articleUrl, baseUrl, parsedUrl, linkText, previousUrls)', () => {
  it('returns false if href has already been fetched', () => {
    const previousUrls = [ 'http://example.com/foo/bar/2' ]
    const href = 'http://example.com/foo/bar/2'
    const parsedUrl = URL.parse(href)

    assert.equal(
      shouldScore(href, '', '', parsedUrl, '', previousUrls),
      false
    )
  })

  it('returns true if href has not been fetched', () => {
    const previousUrls = [ 'http://example.com/foo/bar' ]
    const href = 'http://example.com/foo/bar/2'
    const parsedUrl = URL.parse(href)

    assert.equal(
      shouldScore(href, '', '', parsedUrl, '', previousUrls),
      true
    )
  })

})
