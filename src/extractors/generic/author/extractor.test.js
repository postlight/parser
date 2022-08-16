import assert from 'assert';
import cheerio from 'cheerio';

import GenericAuthorExtractor from './extractor';

describe('GenericAuthorExtractor', () => {
  describe('extract($, cachedMeta)', () => {
    it('extracts author from meta tags', () => {
      const $ = cheerio.load(`
      <html>
        <meta name="dc.author" value="Adam" />
      </html>
    `);
      const result = GenericAuthorExtractor.extract({
        $,
        metaCache: ['dc.author', 'something-else'],
      });

      assert.equal(result, 'Adam');
    });

    it('extracts author from author selectors', () => {
      const $ = cheerio.load(`
      <div>
        <div class="byline">
          <a href="/author/adam">Adam</a>
        </div>
      </div>
    `);
      const result = GenericAuthorExtractor.extract({
        $,
        metaCache: ['dc.author', 'something-else'],
      });

      assert.equal(result, 'Adam');
    });

    it('extracts author with regex selectors', () => {
      const $ = cheerio.load(`
      <div>
        <div class="byline">
          <span>By Adam</span>
        </div>
      </div>
    `);
      const result = GenericAuthorExtractor.extract({
        $,
        metaCache: ['dc.author', 'something-else'],
      });

      assert.equal(result, 'Adam');
    });

    it('returns null if no author found', () => {
      const $ = cheerio.load('<div></div>');
      const result = GenericAuthorExtractor.extract({
        $,
        metaCache: ['dc.author', 'something-else'],
      });

      assert.equal(result, null);
    });
  });
});
