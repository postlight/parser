import assert from 'assert';

import getHostname from './get-hostname';

describe('getHostname(url)', () => {
  it('returns the hostname from a url', () => {
    const url = 'https://example.com/foo/bar';

    assert.equal(getHostname(url), 'example.com');
  });
});
