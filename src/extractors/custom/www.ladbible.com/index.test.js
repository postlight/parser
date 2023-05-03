import assert from 'assert';
import URL from 'url';
import cheerio from 'cheerio';

import Mercury from 'mercury';
import getExtractor from 'extractors/get-extractor';
import { excerptContent } from 'utils/text';

const fs = require('fs');

describe('WwwLadbibleComExtractor', () => {
  describe('initial test case', () => {
    let result;
    let url;
    beforeAll(() => {
      url =
        'https://www.ladbible.com/news/latest-aussie-government-sparks-fury-over-graphic-and-confronting-covid-19-ad-20210711';
      const html = fs.readFileSync('./fixtures/www.ladbible.com.html');
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
      // in ./src/extractors/custom/www.ladbible.com/index.js.
      const { title } = await result;

      // Update these values with the expected values from
      // the article.
      assert.equal(
        title,
        `Aussie Government Sparks Fury Over 'Graphic' And Confronting Covid-19 Ad`
      );
    });

    it('returns the author', async () => {
      // To pass this test, fill out the author selector
      // in ./src/extractors/custom/www.ladbible.com/index.js.
      const { author } = await result;

      // Update these values with the expected values from
      // the article.
      assert.equal(author, 'Stewart Perrie');
    });

    it('returns the date_published', async () => {
      // To pass this test, fill out the date_published selector
      // in ./src/extractors/custom/www.ladbible.com/index.js.
      const { date_published } = await result;

      // Update these values with the expected values from
      // the article.
      assert.equal(date_published, '2021-07-11T21:00:00.000Z');
    });

    it('returns the lead_image_url', async () => {
      // To pass this test, fill out the lead_image_url selector
      // in ./src/extractors/custom/www.ladbible.com/index.js.
      const { lead_image_url } = await result;

      // Update these values with the expected values from
      // the article.
      assert.equal(
        lead_image_url,
        `https://www.ladbible.com/cdn-cgi/image/width=1200,quality=70,format=jpeg,fit=contain,dpr=1/https%3A%2F%2Fs3-images.ladbible.com%2Fs3%2Fcontent%2F788d729460eb11aa5ceadb28b93c0f8a.png`
      );
    });

    it('returns the content', async () => {
      // To pass this test, fill out the content selector
      // in ./src/extractors/custom/www.ladbible.com/index.js.
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
        'The Australian government has copped backlash for publishing a confronting and graphic advertisement'
      );
    });
  });
});
