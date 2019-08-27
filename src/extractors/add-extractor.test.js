import assert from 'assert';

import addExtractor from './add-extractor';

describe('addExtractor({ hostName, baseDomain, extractor })', () => {
  it('can add multiple custom extractors', () => {
    addExtractor({ hostName: 'www.site1.com', extractor: {} });
    addExtractor({ hostName: 'www.site2.com', extractor: {} });
    addExtractor({ baseDomain: 'site3.com', extractor: {} });
    const result = addExtractor({ baseDomain: 'site4.com', extractor: {} });
    assert.equal(Object.keys(result).length, 4);
  });

  it('can add custom extractor using hostName as key', () => {
    const hostName = 'www.somewebsite.com';
    const result = addExtractor({ hostName, extractor: {} });
    assert.equal(typeof result[hostName], 'object');
  });

  it('can add custom extractor using baseDomain as key', () => {
    const baseDomain = 'somewebsite.com';
    const result = addExtractor({ baseDomain, extractor: {} });
    assert.equal(typeof result[baseDomain], 'object');
  });

  it('returns error if an extractor is not provided', () => {
    const result = addExtractor({ hostName: 'www.amazon.com' });
    assert.equal(result.error, true);
  });

  it('returns error if neither hostName or baseDomain are provdied', () => {
    const result = addExtractor({ extractor: {} });
    assert.equal(result.error, true);
  });
});
