import assert from 'assert';
import cheerio from 'cheerio';

import { getScore } from './index';

describe('Scoring utils', () => {
  describe('getScore($node)', () => {
    it('returns null if the node has no score set', () => {
      const $ = cheerio.load('<p>Foo</p>');
      const $node = $('p').first();
      assert.equal(getScore($node), null);
    });

    it('returns 25 if the node has a score attr of 25', () => {
      const $ = cheerio.load('<p score="25">Foo</p>');
      const $node = $('p').first();
      assert.equal(typeof getScore($node), 'number');
      assert.equal(getScore($node), 25);
    });
  });
});
