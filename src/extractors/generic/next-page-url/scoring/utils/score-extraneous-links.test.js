import assert from 'assert';

import scoreExtraneousLinks from './score-extraneous-links';

describe('scoreExtraneousLinks(href)', () => {
  it('returns -25 if link matches extraneous text', () => {
    assert.equal(scoreExtraneousLinks('http://example.com/email-link'), -25);
  });

  it('returns 0 if does not match extraneous text', () => {
    assert.equal(scoreExtraneousLinks('http://example.com/asdf'), 0);
  });
});
