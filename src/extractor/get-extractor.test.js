import assert from 'assert'

import getExtractor from './get-extractor'

describe('getExtractor(url)', () => {
  it('returns GenericExtractor if no custom extractor is found', () => {
    const extractor = getExtractor('http://example.com')

    assert.equal(extractor.domain, '*')
  })

  it('returns a custom extractor if found', () => {
    const extractor = getExtractor('https://nymag.com')

    assert.equal(extractor.domain, 'nymag.com')
  })
})
