import assert from 'assert';
import cheerio from 'cheerio';

import nodeIsSufficient from './node-is-sufficient';

describe('Utils', () => {
  describe('nodeIsSufficient(node)', () => {
    it('returns false if node text length < 100 chars', () => {
      const $ = cheerio.load(`
        <div class="foo bar">
          <p>This is too short</p>
        </div>
      `);

      assert.equal(nodeIsSufficient($.root()), false);
    });

    it('returns true if node text length > 100 chars', () => {
      const $ = cheerio.load(`
        <div class="foo bar">
          <p>
            Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean m
          </p>
        </div>
      `);

      assert.equal(nodeIsSufficient($.root()), true);
    });
  });
});
