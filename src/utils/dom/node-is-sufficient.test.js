import assert from 'assert';
import cheerio from 'cheerio';

import HTML from './fixtures/node-is-sufficient';
import nodeIsSufficient from './node-is-sufficient';

describe('Utils', () => {
  describe('nodeIsSufficient(node)', () => {
    it('returns false if node text length < 100 chars', () => {
      const $ = cheerio.load(HTML.tooShort);
      const sufficient = nodeIsSufficient($.root());
      assert.equal(sufficient, false);
    });

    it('returns true if node text length > 100 chars', () => {
      const $ = cheerio.load(HTML.longEnough);
      const sufficient = nodeIsSufficient($.root());
      assert.equal(sufficient, true);
    });
  });
});
