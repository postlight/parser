import assert from 'assert';

import scoreCapLinks from './score-cap-links';

describe('scoreCapLinks(linkData)', () => {
  it('returns -65 if cap link with next link text', () => {
    const linkData = 'foo next Last page';

    assert.equal(scoreCapLinks(linkData), -65);
  });

  it('returns 0 if does not match a cap link', () => {
    const linkData = 'foo bar WOW GREAT';

    assert.equal(scoreCapLinks(linkData), 0);
  });
});
