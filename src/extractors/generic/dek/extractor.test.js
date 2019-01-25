import assert from 'assert';
import cheerio from 'cheerio';

import GenericDekExtractor from './extractor';

describe('GenericDekExtractor', () => {
  describe('extract({ $, metaCache })', () => {
    it('returns null if no dek can be found', () => {
      const $ = cheerio.load('<div></div>');
      const metaCache = [];
      const result = GenericDekExtractor.extract({ $, metaCache });

      assert.equal(result, null);
    });
  });
});
