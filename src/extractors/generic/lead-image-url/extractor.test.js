import assert from 'assert';
import cheerio from 'cheerio';

import GenericLeadImageUrlExtractor from './extractor';

describe('GenericLeadImageUrlExtractor', () => {
  describe('extract({ $, content, metaCache })', () => {
    it('returns og:image first', () => {
      const $ = cheerio.load(`
      <html>
        <head>
          <meta name="og:image" value="http://example.com/lead.jpg">
        </head>
      </html>
    `);
      const content = $('*').first();
      const metaCache = ['og:image'];

      const result = GenericLeadImageUrlExtractor.extract({
        $,
        content,
        metaCache,
      });

      assert.equal(result, 'http://example.com/lead.jpg');
    });

    it('returns twitter:image', () => {
      const $ = cheerio.load(`
      <html>
        <head>
          <meta name="twitter:image" value="http://example.com/lead.jpg">
        </head>
      </html>
    `);
      const content = $('*').first();
      const metaCache = ['twitter:image'];

      const result = GenericLeadImageUrlExtractor.extract({
        $,
        content,
        metaCache,
      });

      assert.equal(result, 'http://example.com/lead.jpg');
    });

    it('finds images based on scoring', () => {
      const $ = cheerio.load(`
      <div>
        <img src="http://example.com/sprite/abadpic.jpg" />
        <img src="http://example.com/upload/goodpic.jpg" />
        <img src="http://example.com/upload/whateverpic.png" />
      </div>
    `);
      const content = $('*').first();
      const metaCache = [];

      const result = GenericLeadImageUrlExtractor.extract({
        $,
        content,
        metaCache,
      });

      assert.equal(result, 'http://example.com/upload/goodpic.jpg');
    });

    it('returns image based on selectors', () => {
      const $ = cheerio.load(`
      <div>
        <link rel="image_src" href="http://example.com/upload/goodpic.jpg">
      </div>
    `);
      const content = $('*').first();
      const metaCache = [];

      const result = GenericLeadImageUrlExtractor.extract({
        $,
        content,
        metaCache,
      });

      assert.equal(result, 'http://example.com/upload/goodpic.jpg');
    });
  });
});
