import assert from 'assert';

import removeAnchor from './remove-anchor';

describe('removeAnchor(url)', () => {
  it('returns a url w/out #anchor', () => {
    const url = 'http://example.com/foo/bar/wow-cool/page=10/#wow';
    const cleaned = 'http://example.com/foo/bar/wow-cool/page=10';

    assert.equal(removeAnchor(url), cleaned);
  });

  it('returns same url if url has no anchor found', () => {
    const url = 'http://example.com/foo/bar/wow-cool';
    const cleaned = 'http://example.com/foo/bar/wow-cool';

    assert.equal(removeAnchor(url), cleaned);
  });
});
