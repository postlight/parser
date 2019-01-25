import assert from 'assert';

import scoreSimilarity from './score-similarity';

describe('scoreSimilarity(score, articleUrl, href)', () => {
  it('returns a similarity bonus based on current score', () => {
    const articleUrl = 'http://example.com/foo/bar';
    const href = 'http://example.com/foo/bar/2';
    const score = 25;
    assert.equal(Math.round(scoreSimilarity(score, articleUrl, href)), 66);
  });

  it('returns 0 is current score <= 0', () => {
    const articleUrl = 'http://example.com/foo/bar';
    const href = 'http://example.com/foo/bar/2';
    const score = 0;
    assert.equal(scoreSimilarity(score, articleUrl, href), 0);
  });
});
