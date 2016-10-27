import assert from 'assert';

import articleBaseUrl from './article-base-url';

describe('articleBaseUrl(url, parsedUrl)', () => {
  it('returns the base url of a paginated url', () => {
    const url = 'http://example.com/foo/bar/wow-cool/page=10';
    const cleaned = 'http://example.com/foo/bar/wow-cool';

    assert.equal(articleBaseUrl(url), cleaned);
  });

  it('returns same url if url has no pagination info', () => {
    const url = 'http://example.com/foo/bar/wow-cool/';
    const cleaned = 'http://example.com/foo/bar/wow-cool';

    assert.equal(articleBaseUrl(url), cleaned);
  });
});
