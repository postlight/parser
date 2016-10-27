import assert from 'assert';

import { scoreCommas } from './index';

describe('Scoring utils', () => {
  describe('scoreCommas(text)', () => {
    it('returns 0 if text has no commas', () => {
      assert.equal(scoreCommas('Foo bar'), 0);
    });

    it('returns a point for every comma in the text', () => {
      assert.equal(scoreCommas('Foo, bar'), 1);
      assert.equal(scoreCommas('Foo, bar, baz'), 2);
      assert.equal(scoreCommas('Foo, bar, baz, bat'), 3);
    });
  });
});
