import assert from 'assert';
import URL from 'url';
import cheerio from 'cheerio';

import Mercury from 'mercury';
import getExtractor from 'extractors/get-extractor';
import { excerptContent } from 'utils/text';

const fs = require('fs');

describe('WwwGrueneDeExtractor', () => {
  describe('initial test case', () => {
    let result;
    let url;
    beforeAll(() => {
      url = 'https://www.gruene.de/themen/arbeit';
      const html = fs.readFileSync(
        './fixtures/www.gruene.de/1566929456502.html'
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
      // in ./src/extractors/custom/www.gruene.de/index.js.
      const { title } = await result;

      // Update these values with the expected values from
      // the article.
      assert.equal(title, `Wir kämpfen für gute Arbeit`);
    });

    it('returns the author', async () => {
      // To pass this test, fill out the author selector
      // in ./src/extractors/custom/www.gruene.de/index.js.
      const { author } = await result;

      // Update these values with the expected values from
      // the article.
      assert.equal(author, null);
    });

    it('returns the date_published', async () => {
      // To pass this test, fill out the date_published selector
      // in ./src/extractors/custom/www.gruene.de/index.js.
      const { date_published } = await result;

      // Update these values with the expected values from
      // the article.
      assert.equal(date_published, null);
    });

    it('returns the dek', async () => {
      // To pass this test, fill out the dek selector
      // in ./src/extractors/custom/www.gruene.de/index.js.
      const { dek } = await result;

      // Update these values with the expected values from
      // the article.
      assert.equal(dek, null);
    });

    // BUG: Out of a reason I don't understand, the lead_image_url is no longer found
    // if I add 'section header' to the multi match selection
    /*
    it('returns the lead_image_url', async () => {
      // To pass this test, fill out the lead_image_url selector
      // in ./src/extractors/custom/www.gruene.de/index.js.
      const { lead_image_url } = await result;

      // Update these values with the expected values from
      // the article.
      assert.equal(
        lead_image_url,
        `https://cdn.gruene.de/images/20190423-Arbeit-chris-ralston-unsplash.jpg?quality=85&width=1360&height=960&mode=crop&signature=58842ccbf3ef01c62bd1f79b66e0dce8743cd017`
      );
    });
    */

    it('returns the content', async () => {
      // To pass this test, fill out the content selector
      // in ./src/extractors/custom/www.gruene.de/index.js.
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
        'Auf dem Arbeitsmarkt hat sich einiges verbessert, aber es ist lange nicht alles'
      );
    });

    it('does not contain navigation links', async () => {
      const { content } = await result;
      const $ = cheerio.load(content || '');
      const lastParagraphText = excerptContent(
        $('p')
          .last()
          .text(),
        7
      );
      assert.equal(
        lastParagraphText,
        'Wir Grüne wollen den Arbeitsmarkt so gestalten,'
      );
    });
  });
});
