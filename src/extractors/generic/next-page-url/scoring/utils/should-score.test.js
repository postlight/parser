import assert from 'assert';
import URL from 'url';

import shouldScore from './should-score';

describe('shouldScore(href, articleUrl, baseUrl, parsedUrl, linkText, previousUrls)', () => {
  it('returns false if href has already been fetched', () => {
    const previousUrls = ['http://example.com/foo/bar/2'];
    const href = 'http://example.com/foo/bar/2';
    const parsedUrl = URL.parse(href);

    assert.equal(shouldScore(href, '', '', parsedUrl, '', previousUrls), false);
  });

  it('returns true if href has not been fetched', () => {
    const previousUrls = ['http://example.com/foo/bar'];
    const href = 'http://example.com/foo/bar/2';
    const parsedUrl = URL.parse(href);

    assert.equal(shouldScore(href, '', '', parsedUrl, '', previousUrls), true);
  });
});
