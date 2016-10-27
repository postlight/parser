import assert from 'assert';

import scoreNextLinkText from './score-next-link-text';

describe('scoreNextLinkText(linkData)', () => {
  it('returns 50 if contains common next link text', () => {
    const linkData = 'foo bar Next page';

    assert.equal(scoreNextLinkText(linkData), 50);
  });

  it('returns 0 if does not contain common next link text', () => {
    const linkData = 'foo bar WOW GREAT';

    assert.equal(scoreNextLinkText(linkData), 0);
  });
});
