import assert from 'assert';
import fs from 'fs';
import URL from 'url';
import cheerio from 'cheerio';

import Mercury from 'mercury';
import getExtractor from 'extractors/get-extractor';
import { excerptContent } from 'utils/text';

describe('WwwWashingtonpostComExtractor', () => {
  describe('initial test case', () => {
    let result;
    let url;
    beforeAll(() => {
      url =
        'https://www.washingtonpost.com/politics/trump-foundation-apparently-admits-to-violating-ban-on-self-dealing-new-filing-to-irs-shows/2016/11/22/893f6508-b0a9-11e6-8616-52b15787add0_story.html';
      const html =
        fs.readFileSync('./fixtures/www.washingtonpost.com/1480364838420.html');
      result =
        Mercury.parse(url, html, { fallback: false });
    });

    it('is selected properly', async () => {
      // This test should be passing by default.
      // It sanity checks that the correct parser
      // is being selected for URLs from this domain
      const extractor = getExtractor(url);
      assert.equal(extractor.domain, URL.parse(url).hostname);
    });

    it('returns the title', async () => {
      // To pass this test, fill out the title selector
      // in ./src/extractors/custom/www.washingtonpost.com/index.js.
      const { title } = await result;

      // Update these values with the expected values from
      // the article.
      assert.equal(title, 'Trump Foundation admits to violating ban on ‘self-dealing,’ new filing to IRS shows');
    });

    it('returns the author', async () => {
      // To pass this test, fill out the author selector
      // in ./src/extractors/custom/www.washingtonpost.com/index.js.
      const { author } = await result;

      // Update these values with the expected values from
      // the article.
      assert.equal(author, 'David A. Fahrenthold');
    });

    it('returns the date_published', async () => {
      // To pass this test, fill out the date_published selector
      // in ./src/extractors/custom/www.washingtonpost.com/index.js.
      const { date_published } = await result;

      // Update these values with the expected values from
      // the article.
      assert.equal(date_published, '2016-11-22T13:57:00.000Z');
    });

    it('returns the lead_image_url', async () => {
      // To pass this test, fill out the lead_image_url selector
      // in ./src/extractors/custom/www.washingtonpost.com/index.js.
      const { lead_image_url } = await result;

      // Update these values with the expected values from
      // the article.
      assert.equal(lead_image_url, 'https://img.washingtonpost.com/rf/image_1484w/2010-2019/WashingtonPost/2016/11/01/Others/Images/2016-11-01/Trump-HomeSafe-News-131478026931.jpg');
    });

    it('returns the content', async () => {
      // To pass this test, fill out the content selector
      // in ./src/extractors/custom/www.washingtonpost.com/index.js.
      // You may also want to make use of the clean and transform
      // options.
      const { content } = await result;

      const $ = cheerio.load(content || '');

      const first13 = excerptContent($('*').first().text(), 13);

      // Update these values with the expected values from
      // the article.
      assert.equal(first13, 'Painter Michael Israel, left, poses with Donald and Melania Trump in 2007 at');
    });
  });
});
