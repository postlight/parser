import assert from 'assert';
import cheerio from 'cheerio';
import moment from 'moment-timezone';

import HTML from './fixtures/html';
import GenericDatePublishedExtractor from './extractor';

describe('GenericDatePublishedExtractor', () => {
  describe('extract($, metaCache)', () => {
    it('extracts datePublished from meta tags', () => {
      const $ = cheerio.load(HTML.datePublishedMeta.test);
      const metaCache = ['displaydate', 'something-else'];
      const result = GenericDatePublishedExtractor.extract({
        $,
        url: '',
        metaCache,
      });

      assert.equal(result, HTML.datePublishedMeta.result.toISOString());
    });

    it('extracts datePublished from selectors', () => {
      const $ = cheerio.load(HTML.datePublishedSelectors.test);
      const metaCache = [];
      const result = GenericDatePublishedExtractor.extract({
        $,
        url: '',
        metaCache,
      });

      assert.equal(result, HTML.datePublishedMeta.result.toISOString());
    });

    it('extracts from url formatted /2012/08/01/etc', () => {
      const $ = cheerio.load('<div></div>');
      const metaCache = [];
      const url = 'https://example.com/2012/08/01/this-is-good';
      const result = GenericDatePublishedExtractor.extract({
        $,
        url,
        metaCache,
      });

      assert.equal(result, new Date('2012/08/01').toISOString());
    });

    it('extracts from url formatted /2020-01-01', () => {
      const $ = cheerio.load('<div></div>');
      const metaCache = [];
      const url = 'https://example.com/2020-01-01/this-is-good';
      const result = GenericDatePublishedExtractor.extract({
        $,
        url,
        metaCache,
      });

      assert.equal(result, moment('2020-01-01', 'YYYY-MM-DD').toISOString());
    });

    it('extracts from url formatted /2020/jan/01', () => {
      // this works in Chrome, but not in PhantomJS, so disabling
      // for browser testing
      if (!cheerio.browser) {
        const $ = cheerio.load('<div></div>');
        const metaCache = [];
        const url = 'https://example.com/2020/jan/01/this-is-good';
        const result = GenericDatePublishedExtractor.extract({
          $,
          url,
          metaCache,
        });

        assert.equal(result, moment(new Date('2020 jan 01')).toISOString());
      }
    });

    it('returns null if no date can be found', () => {
      const $ = cheerio.load('<div></div>');
      const metaCache = [];
      const result = GenericDatePublishedExtractor.extract({
        $,
        url: '',
        metaCache,
      });

      assert.equal(result, null);
    });
  });
});
