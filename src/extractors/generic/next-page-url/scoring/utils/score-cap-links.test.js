import assert from 'assert';

import scoreCapLinks from './score-cap-links';

describe('scoreCapLinks(linkData)', () => {
  it('returns -65 if cap link with next link text', () => {
    assert.equal(scoreCapLinks('foo next Last page'), -65);
  });

  it('returns 0 if does not match a cap link', () => {
    assert.equal(scoreCapLinks('foo bar WOW GREAT'), 0);
  });
});
