import assert from 'assert';
import cheerio from 'cheerio';

import { clean } from 'test-helpers';
import HTML from './fixtures/html';
import { paragraphize } from './index';

describe('Generic Extractor Utils', () => {
  describe('paragraphize(node)', () => {
    it('conversts a BR into P and moves inline contents to P tag after current parent', () => {
      const $ = cheerio.load(HTML.paragraphize.before);
      const node = $('br').get(0);

      // note: result here is not valid html; will handle elsewhere
      const result = paragraphize(node, $, true).html();

      assert.equal(clean(result), clean(HTML.paragraphize.after));
    });

    it('conversts a BR into P and stops when block element hit', () => {
      const $ = cheerio.load(HTML.paragraphizeBlock.before);
      const node = $('br').get(0);

      // note: result here is not valid html; will handle elsewhere
      const result = paragraphize(node, $, true).html();

      if ($.browser) {
        // small quirks in how jquery handles this vs. cheerio
        const html =
          '<p> Here is some text <p> Here is more text </p></p><div>And also this</div> <p></p>';
        assert.equal(clean(result), html);
      } else {
        assert.equal(clean(result), clean(HTML.paragraphizeBlock.after));
      }
    });
  });
});
