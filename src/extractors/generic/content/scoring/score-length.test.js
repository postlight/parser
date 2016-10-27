import assert from 'assert';

import { scoreLength } from './index';

describe('Scoring utils', () => {
  describe('scoreLength(textLength, tagName)', () => {
    it('returns 0 if length < 50 chars', () => {
      assert.equal(scoreLength(30), 0);
    });

    it('returns varying scores but maxes out at 3', () => {
      assert.equal(scoreLength(150), 1);
      assert.equal(scoreLength(199), 1.98);
      assert.equal(scoreLength(200), 2);
      assert.equal(scoreLength(250), 3);
      assert.equal(scoreLength(500), 3);
      assert.equal(scoreLength(1500), 3);
    });
  });
});
