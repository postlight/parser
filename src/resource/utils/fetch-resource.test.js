import assert from 'assert'
import URL from 'url'

import {
  default as fetchResource,
  baseDomain,
  validateResponse,
} from './fetch-resource'
import { MAX_CONTENT_LENGTH } from './constants'

describe('fetchResource(url)', () => {
  it('fetches domains', async () => {
    const url = 'http://theconcourse.deadspin.com/1786177057'
    const { body, response } = await fetchResource(url)

    assert.equal(typeof body, 'string')
  })
})

describe('validateResponse(response)', () => {
  it('validates a response object', () => {
    const validResponse = {
      statusMessage: "OK",
      statusCode: 200,
      headers: {
        "content-type": 'text/html',
        "content-length": 500,
      }
    }

    assert.equal(validateResponse(validResponse), true)
  })

  it('throws an error if there is no status code', () => {
    const invalidResponse = {
    }

    assert.throws(
      () => {
        validateResponse(invalidResponse)
      },
      /unable to fetch content/i
    )
  })

  it('throws an error if response code is not 2xx', () => {
    const invalidResponse = {
      statusCode: 500,
    }

    assert.throws(
      () => {
        validateResponse(invalidResponse)
      },
      /instructed to reject non-2xx/i
    )
  })

  it('throws an error if response has bad content-type', () => {
    const invalidResponse = {
      statusMessage: "OK",
      statusCode: 200,
      headers: {
        "content-type": 'image/gif',
        "content-length": 500,
      }
    }

    assert.throws(
      () => {
        validateResponse(invalidResponse)
      },
      /content-type for this resource/i
    )
  })

  it('throws an error if response length is > max', () => {
    const invalidResponse = {
      statusMessage: "OK",
      statusCode: 200,
      headers: {
        "content-type": 'text/html',
        "content-length": MAX_CONTENT_LENGTH + 1,
      }
    }

    assert.throws(
      () => {
        validateResponse(invalidResponse)
      },
      /Content for this resource was too large/i
    )
  })
})

describe('baseDomain(parsedUrl)', () => {
  it('returns the base domain, excluding subdomain', () => {
    const url = 'https://www.npmjs.com/package/request#streaming'
    const parsedUrl = URL.parse(url)

    assert.equal(baseDomain(parsedUrl), 'npmjs.com')
  })

  it('returns the base domain as is if no subdomain', () => {
    const url = 'https://npmjs.com/package/request#streaming'
    const parsedUrl = URL.parse(url)

    assert.equal(baseDomain(parsedUrl), 'npmjs.com')
  })
})
