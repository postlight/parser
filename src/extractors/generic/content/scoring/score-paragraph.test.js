import assert from 'assert';
import cheerio from 'cheerio';

import HTML from './fixtures/html';
import { scoreParagraph } from './index';

describe('Scoring utils', () => {
  describe('scoreParagraph(node)', () => {
    it('returns 0 if text is less than 25 chars', () => {
      const html = '<p><em>Foo</em> bar</p>';
      const $ = cheerio.load(html);
      const node = $('p').first();

      const score = scoreParagraph(node);

      assert.equal(score, 0);
    });

    it('returns 1 if text is > 25 chars and has 0 commas', () => {
      const $ = cheerio.load(HTML.score1);
      const node = $('p').first();

      const score = scoreParagraph(node);

      assert.equal(score, 1);
    });

    it('returns 3 if text is > 25 chars and has 2 commas', () => {
      const $ = cheerio.load(HTML.score3);
      const node = $('p').first();

      const score = scoreParagraph(node);

      assert.equal(score, 3);
    });

    it('returns 19 if text has 15 commas, ~600 chars', () => {
      const $ = cheerio.load(HTML.score19);
      const node = $('p').first();

      const score = scoreParagraph(node);

      assert.equal(score, 19);
    });
  });
});
