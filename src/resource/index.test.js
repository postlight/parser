import assert from 'assert'

import Resource from './index'

describe('Resource', () => {
  describe('create(url)', function() {
    this.timeout(3000)
    it('fetches the page and returns a cheerio object', async () => {
      const url = 'http://theconcourse.deadspin.com/1786177057'
      const $ = await Resource.create(url)

      console.log($.html())
    })
  })

  describe('generateDoc({ body, response })', () => {
    it('returns a cheerio object if valid', () => {
      const response = { headers: { "content-type": "text/html" } }

      const body = `<div><p>Hi</p></div>`
      const $ = Resource.generateDoc({ body, response })

      assert.equal($.html(), body)
    })

    it('throws an error if the content is not text', () => {
      const response = {
        headers: {
          "content-type": "foo"
        }
      }
      const body = ''

      assert.throws(
        () => {
          Resource.generateDoc({ body, response })
        },
          /content does not appear to be text/i
      )
    })

    it('throws an error if the content has no children', () => {
      const response = {
        headers: {
          "content-type": "html"
        }
      }
      const body = ``

      assert.throws(
        () => {
          Resource.generateDoc({ body, response })
        },
          /no children/i
      )
    })
  })
})
