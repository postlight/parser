import assert from 'assert';
import cheerio from 'cheerio';

import { setScore, getScore } from './index';

describe('Scoring utils', () => {
  describe('setScore(node, $, amount)', () => {
    it("sets the specified amount as the node's score", () => {
      const $ = cheerio.load('<p>Foo</p>');
      const $node = $('p').first();
      const newScore = 25;
      setScore($node, $, newScore);

      const score = getScore($node);
      assert(score, newScore);
    });
  });
});
