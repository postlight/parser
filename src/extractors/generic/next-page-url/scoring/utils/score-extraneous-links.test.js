import assert from 'assert';

import scoreExtraneousLinks from './score-extraneous-links';

describe('scoreExtraneousLinks(href)', () => {
  it('returns -25 if link matches extraneous text', () => {
    const url = 'http://example.com/email-link';

    assert.equal(scoreExtraneousLinks(url), -25);
  });

  it('returns 0 if does not match extraneous text', () => {
    const url = 'http://example.com/asdf';

    assert.equal(scoreExtraneousLinks(url), 0);
  });
});
