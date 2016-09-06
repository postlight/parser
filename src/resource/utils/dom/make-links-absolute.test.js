import assert from 'assert'
import cheerio from 'cheerio'

import makeLinksAbsolute from './make-links-absolute'

describe('makeLinksAbsolute($)', () => {
  it('makes relative #hrefs absolute', () => {
    const html = `<a href="#foo">bar</a>`
    const $ = cheerio.load(html)

    const result = makeLinksAbsolute($, 'http://example.com').html()

    assert.equal(result,  `<a href="http://example.com/#foo">bar</a>`)
  })

  it('makes relative ./relative paths absolute', () => {
    const html = `<a href="foo/bar">bar</a>`
    const $ = cheerio.load(html)

    const result = makeLinksAbsolute($, 'http://example.com/baz/bat').html()

    assert.equal(result,  `<a href="http://example.com/baz/foo/bar">bar</a>`)
  })

  it('makes relative /root/paths absolute', () => {
    const html = `<a href="/foo/bar">bar</a>`
    const $ = cheerio.load(html)

    const result = makeLinksAbsolute($, 'http://example.com/baz/bat').html()

    assert.equal(result,  `<a href="http://example.com/foo/bar">bar</a>`)
  })

  it('makes relative srcs absolute', () => {
    const html = `<img src="#foo">`
    const $ = cheerio.load(html)

    const result = makeLinksAbsolute($, 'http://example.com').html()

    assert.equal(result,  `<img src="http://example.com/#foo">`)
  })
})
