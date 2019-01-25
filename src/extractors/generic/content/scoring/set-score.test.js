import assert from 'assert';
import cheerio from 'cheerio';

import { setScore, getScore } from './index';

describe('Scoring utils', () => {
  describe('setScore(node, $, amount)', () => {
    it("sets the specified amount as the node's score", () => {
      const $ = cheerio.load('<p>Foo</p>');
      let $node = $('p').first();

      const newScore = 25;
      $node = setScore($node, $, newScore);

      const score = getScore($node);
      assert(score, newScore);
    });
  });
});
