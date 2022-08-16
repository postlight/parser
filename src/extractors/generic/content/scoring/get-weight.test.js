import assert from 'assert';
import cheerio from 'cheerio';

import { getWeight } from './index';

describe('Generic Extractor Utils', () => {
  describe('getWeight(node)', () => {
    it('returns a score of 25 if node has positive id', () => {
      const $ = cheerio.load(`
        <div id="entry">
          <p>Ooo good one</p>
        </div>
      `);
      assert.equal(getWeight($('div')), 25);
    });

    it('returns a score of -25 if node has negative id', () => {
      const $ = cheerio.load(`
        <div id="adbox">
          <p>Ooo good one</p>
        </div>
      `);
      assert.equal(getWeight($('div')), -25);
    });

    it('returns a score of 25 if node has positive class', () => {
      const $ = cheerio.load(`
        <div class="entry">
          <p>Ooo good one</p>
        </div>
      `);
      assert.equal(getWeight($('div')), 25);
    });

    it('returns a score of -25 if node has negative class', () => {
      const $ = cheerio.load(`
        <div id="comment ad">
          <p>Ooo good one</p>
        </div>
      `);
      assert.equal(getWeight($('div')), -25);
    });

    it('returns a score of 25 if node has both positive id and class', () => {
      const $ = cheerio.load(`
        <div id="article" class="entry">
          <p>Ooo good one</p>
        </div>
      `);
      assert.equal(getWeight($('div')), 25);
    });

    it('returns a score of 25 if node has pos id and neg class', () => {
      // is this really wanted? id="entry" class="adbox"
      // should get positive score?
      const $ = cheerio.load(`
        <div id="article" class="adbox">
          <p>Ooo good one</p>
        </div>
      `);
      assert.equal(getWeight($('div')), 25);
    });

    it('returns a score of 10 if node has pos img class', () => {
      const $ = cheerio.load(`
        <div class="figure">
          <p>Ooo good one</p>
        </div>
      `);
      assert.equal(getWeight($('div')), 10);
    });

    it('returns a score of 35 if node has pos id pos img class', () => {
      const $ = cheerio.load(`
        <div id="article" class="figure">
          <p>Ooo good one</p>
        </div>
      `);
      assert.equal(getWeight($('div')), 35);
    });

    it("adds an add'l 25 (total 50) if node uses entry-content-asset class", () => {
      const $ = cheerio.load(`
        <div id="foo" class="entry-content-asset">
          <p>Ooo good one</p>
        </div>
      `);
      assert.equal(getWeight($('div')), 50);
    });
  });
});
