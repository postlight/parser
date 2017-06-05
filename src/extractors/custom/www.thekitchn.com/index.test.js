import assert from 'assert';
import fs from 'fs';
import URL from 'url';
import cheerio from 'cheerio';

import Mercury from 'mercury';
import getExtractor from 'extractors/get-extractor';
import { excerptContent } from 'utils/text';

describe('WwwThekitchnComExtractor', () => {
  describe('initial test case', () => {
    let result;
    let url;
    beforeAll(() => {
      url =
        'http://www.thekitchn.com/recipe-orange-and-strawberry-muffins-244329';
      const html =
        fs.readFileSync('./fixtures/www.thekitchn.com/1496697411357.html');
      result =
        Mercury.parse(url, html, { fallback: false });
    });

    it('is selected properly', () => {
      const extractor = getExtractor(url);
      assert.equal(extractor.domain, URL.parse(url).hostname);
    });

    it('returns the title', async () => {
      const { title } = await result;
      assert.equal(title, 'Recipe: Orange and Strawberry Muffins');
    });

    it('returns the author', async () => {
      const { author } = await result;
      assert.equal(author, 'Kelli Foster');
    });

    it('returns the date_published', async () => {
      const { date_published } = await result;
      assert.equal(date_published, '2017-06-05T04:00:00.000Z');
    });

    it('returns the content', async () => {
      const { content } = await result;

      const $ = cheerio.load(content || '');

      const first13 = excerptContent($('*').first().text(), 13);

      // Update these values with the expected values from
      // the article.
      assert.equal(first13, '(Image credit: Joe Lingeman) These are not cupcakes dressed up in muffin\'s clothing.');
    });
  });
});
