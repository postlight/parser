import assert from 'assert';
import URL from 'url';

import validateUrl from './validate-url';

describe('validateUrl(parsedUrl)', () => {
  it('returns false if url is not valid', () => {
    const url = URL.parse('example.com');
    const valid = validateUrl(url);

    assert.equal(valid, false);
  });

  it('returns true if url is valid', () => {
    const url = URL.parse('http://example.com');
    const valid = validateUrl(url);

    assert.equal(valid, true);
  });
});
