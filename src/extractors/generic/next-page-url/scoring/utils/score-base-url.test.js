import assert from 'assert';

import scoreBaseUrl from './score-base-url';
import { makeBaseRegex } from '../score-links';

describe('scoreBaseUrl(href, baseRegex)', () => {
  it('returns -25 if url does not contain the base url', () => {
    const baseUrl = 'http://example.com/foo/bar';
    const badUrl = 'http://foo.com/foo/bar';
    const baseRegex = makeBaseRegex(baseUrl);

    assert.equal(scoreBaseUrl(badUrl, baseRegex), -25);
  });

  it('returns 0 if url contains the base url', () => {
    const baseUrl = 'http://example.com/foo/bar';
    const badUrl = 'http://example.com/foo/bar/bat';
    const baseRegex = makeBaseRegex(baseUrl);

    assert.equal(scoreBaseUrl(badUrl, baseRegex), 0);
  });
});
