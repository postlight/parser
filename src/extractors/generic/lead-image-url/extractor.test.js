import assert from 'assert';
import cheerio from 'cheerio';

import HTML from './fixtures/html';

import GenericLeadImageUrlExtractor from './extractor';

describe('GenericLeadImageUrlExtractor', () => {
  describe('extract({ $, content, metaCache })', () => {
    it('returns og:image first', () => {
      const $ = cheerio.load(HTML.og.test);
      const content = $('*').first();
      const metaCache = ['og:image'];

      const result = GenericLeadImageUrlExtractor.extract({
        $,
        content,
        metaCache,
      });

      assert.equal(result, HTML.og.result);
    });

    it('returns twitter:image', () => {
      const $ = cheerio.load(HTML.twitter.test);
      const content = $('*').first();
      const metaCache = ['twitter:image'];

      const result = GenericLeadImageUrlExtractor.extract({
        $,
        content,
        metaCache,
      });

      assert.equal(result, HTML.twitter.result);
    });

    it('finds images based on scoring', () => {
      const $ = cheerio.load(HTML.scoring.test);
      const content = $('*').first();
      const metaCache = [];

      const result = GenericLeadImageUrlExtractor.extract({
        $,
        content,
        metaCache,
      });

      assert.equal(result, HTML.scoring.result);
    });

    it('returns image based on selectors', () => {
      const $ = cheerio.load(HTML.selectors.test);
      const content = $('*').first();
      const metaCache = [];

      const result = GenericLeadImageUrlExtractor.extract({
        $,
        content,
        metaCache,
      });

      assert.equal(result, HTML.selectors.result);
    });
  });
});
