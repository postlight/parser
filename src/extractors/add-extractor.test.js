import assert from 'assert';

import addExtractor from './add-extractor';

describe('addExtractor(extractor)', () => {
  it('can add multiple custom extractors', () => {
    addExtractor({ domain: 'www.site1.com' });
    addExtractor({ domain: 'www.site2.com' });
    const result = addExtractor({ domain: 'www.site3.com' });
    assert.equal(Object.keys(result).length, 3);
  });

  it('returns error if an extractor is not provided', () => {
    const result = addExtractor();
    assert.equal(result.error, true);
  });

  it('returns error if a domain key is not included within the custom extractor', () => {
    const result = addExtractor({ test: 'abc' });
    assert.equal(result.error, true);
  });
});
