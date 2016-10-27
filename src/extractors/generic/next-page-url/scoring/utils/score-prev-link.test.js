import assert from 'assert';

import scorePrevLink from './score-prev-link';

describe('scorePrevLink(linkData)', () => {
  it('returns -200 if link matches previous text', () => {
    const linkData = 'foo next previous page';

    assert.equal(scorePrevLink(linkData), -200);
  });

  it('returns 0 if does not match a prev link', () => {
    const linkData = 'foo bar WOW GREAT';

    assert.equal(scorePrevLink(linkData), 0);
  });
});
