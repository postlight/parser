import assert from 'assert';

import clean from './lead-image-url';

describe('clean(leadImageUrl)', () => {
  it('returns the url if valid', () => {
    const url = 'https://example.com';
    assert.equal(clean(url), url);
  });

  it('returns null if the url is not valid', () => {
    const url = 'this is not a valid url';
    assert.equal(clean(url), null);
  });

  it('trims whitespace', () => {
    const url = '  https://example.com/foo/bar.jpg';
    assert.equal(clean(url), url.trim());
  });
});
