import assert from 'assert';
import cheerio from 'cheerio';

import HTML from './fixtures/html';
import { getOrInitScore, getScore } from './index';

describe('getOrInitScore(node, $)', () => {
  describe('when score set', () => {
    it("returns score if node's score already set", () => {
      const html = '<p score="40">Foo</p>';
      const $ = cheerio.load(html);
      const node = $('p').first();

      const score = getOrInitScore(node, $);

      assert.equal(score, 40);
    });
  });

  describe('when no score set', () => {
    it('returns 0 if no class/id and text < 25 chars', () => {
      const html = '<p>Foo</p>';
      const $ = cheerio.load(html);
      const node = $('p').first();

      const score = getOrInitScore(node, $);

      assert.equal(score, 0);
    });

    it('returns score if no class/id and has commas/length', () => {
      const $ = cheerio.load(HTML.score19);
      const node = $('p').first();

      const score = getOrInitScore(node, $);

      assert.equal(score, 19);
    });

    it('returns greater score if weighted class/id is set', () => {
      const $ = cheerio.load(HTML.score44);
      const node = $('p').first();

      const score = getOrInitScore(node, $);

      assert.equal(score, 44);
    });

    it('gives 1/4 of its score to its parent', () => {
      const $ = cheerio.load(HTML.score44Parent);
      const node = $('p').first();

      getOrInitScore(node, $);

      assert.equal(getScore(node.parent()), 16);
    });
  });
});
