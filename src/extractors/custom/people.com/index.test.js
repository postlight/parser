import assert from 'assert';
import URL from 'url';
import cheerio from 'cheerio';
import moment from 'moment-timezone';

import Mercury from 'mercury';
import getExtractor from 'extractors/get-extractor';
import { excerptContent } from 'utils/text';

const fs = require('fs');

describe('PeopleComExtractor', () => {
  describe('initial test case', () => {
    let result;
    let url;
    beforeAll(() => {
      url = 'http://people.com/style/jennifer-aniston-coat-tags-jimmy-kimmel/';
      const html = fs.readFileSync('./fixtures/people.com.html');
      result = Mercury.parse(url, { html, fallback: false });
    });

    it('is selected properly', () => {
      // This test should be passing by default.
      // It sanity checks that the correct parser
      // is being selected for URLs from this domain
      const extractor = getExtractor(url);
      assert.equal(extractor.domain, URL.parse(url).hostname);
    });

    it('returns the title', async () => {
      // To pass this test, fill out the title selector
      // in ./src/extractors/custom/people.com/index.js.
      const { title } = await result;

      // Update these values with the expected values from
      // the article.
      assert.equal(
        title,
        "Jennifer Aniston on Leaving the Tags on Her Céline Coat: 'I Wore It Four Times and Didn't Notice!'"
      );
    });

    it('returns the author', async () => {
      // To pass this test, fill out the author selector
      // in ./src/extractors/custom/people.com/index.js.
      const { author } = await result;

      // Update these values with the expected values from
      // the article.
      assert.equal(author, 'Emily Kirkpatrick');
    });

    it('returns the date_published', async () => {
      // To pass this test, fill out the date_published selector
      // in ./src/extractors/custom/people.com/index.js.
      const { date_published } = await result;

      const new_date_published = moment(date_published)
        .format()
        .split('T')[0];

      // Update these values with the expected values from
      // the article.
      assert.equal(new_date_published, '2016-12-12');
    });

    it('returns the lead_image_url', async () => {
      // To pass this test, fill out the lead_image_url selector
      // in ./src/extractors/custom/people.com/index.js.
      const { lead_image_url } = await result;

      // Update these values with the expected values from
      // the article.
      assert.equal(
        lead_image_url,
        'https://people.com/thmb/mKmBT1HGFXbCA_wJQGJFNNKdNjI=/1359x2000/filters:fill(auto,1)/jennifer-aniston5-2000-b3efb31fbb3b42c1a0d5872c91f574f7.jpg'
      );
    });

    it('returns the dek', async () => {
      // To pass this test, fill out the dek selector
      // in ./src/extractors/custom/people.com/index.js.
      const { dek } = await result;

      // Update these values with the expected values from
      // the article.
      assert.equal(
        dek,
        'The actress explained the story behind her minor wardrobe malfunction to Jimmy Kimmel'
      );
    });

    it('returns the content', async () => {
      // To pass this test, fill out the content selector
      // in ./src/extractors/custom/people.com/index.js.
      // You may also want to make use of the clean and transform
      // options.
      const { content } = await result;

      const $ = cheerio.load(content || '');

      const first13 = excerptContent(
        $('*')
          .first()
          .text(),
        13
      );

      // Update these values with the expected values from
      // the article.
      assert.equal(
        first13,
        'People who don’t chronicle every item of clothing worn by the rich and'
      );
    });
  });
});
