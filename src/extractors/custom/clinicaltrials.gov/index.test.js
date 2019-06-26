import assert from 'assert';
import URL from 'url';
import cheerio from 'cheerio';
import moment from 'moment-timezone';

import Mercury from 'mercury';
import getExtractor from 'extractors/get-extractor';
import { excerptContent } from 'utils/text';

const fs = require('fs');

describe('ClinicaltrialsGovExtractor', () => {
  describe('initial test case', () => {
    let result;
    let url;

    beforeAll(() => {
      url =
        'https://clinicaltrials.gov/ct2/show/NCT03746262?term=Guardant+Health';
      const html = fs.readFileSync(
        './fixtures/clinicaltrials.gov/1551708504719.html'
      );
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
      // in ./src/extractors/custom/clinicaltrials.gov/index.js.
      const { title } = await result;

      // Update these values with the expected values from
      // the article.
      assert.equal(
        title,
        `Changes in Circulating Tumor-Specific DNA in Patients With Non-Metastatic Non-Small Cell Lung Cancer`
      );
    });

    it('returns the author', async () => {
      // To pass this test, fill out the author selector
      // in ./src/extractors/custom/clinicaltrials.gov/index.js.
      const { author } = await result;

      // Update these values with the expected values from
      // the article.
      assert.equal(author, 'Wake Forest University Health Sciences');
    });

    it('returns the date_published', async () => {
      // To pass this test, fill out the date_published selector
      // in ./src/extractors/custom/clinicaltrials.gov/index.js.
      const { date_published } = await result;

      // Update these values with the expected values from
      // the article.
      assert.equal(moment(date_published).format('YYYY-MM-DD'), '2018-11-21');
    });

    it('returns the content', async () => {
      // To pass this test, fill out the content selector
      // in ./src/extractors/custom/clinicaltrials.gov/index.js.
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
        'The purpose of this research study is to evaluate a blood test to'
      );
    });
  });
});
