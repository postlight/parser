import assert from 'assert';
import URL from 'url';
import cheerio from 'cheerio';

import Mercury from 'mercury';
import getExtractor from 'extractors/get-extractor';
import { excerptContent } from 'utils/text';

const fs = require('fs');

describe('DeadspinExtractor', () => {
  describe('initial test case', () => {
    let result;
    let url;
    beforeAll(() => {
      url =
        'http://deadspin.com/the-nationals-are-stuck-with-danny-espinosa-tonight-un-1787706769';
      const html = fs.readFileSync(
        './fixtures/deadspin.com/1476389931786.html'
      );
      result = Mercury.parse(url, { html, fallback: false });
    });

    it('is selected properly', async () => {
      const extractor = getExtractor(url);
      assert.equal(extractor.domain, URL.parse(url).hostname);
    });

    it('returns the title', async () => {
      // To pass this test, fill out the title selector
      // in ./src/extractors/custom/deadspin.com/index.js.
      // Update these values with the expected values from
      // the article.
      const { title } = await result;
      assert.equal(
        title,
        'The Nationals Are Stuck With Danny Espinosa Tonight, Unless They Opt For The Only Thing Worse'
      );
    });

    it('returns the author', async () => {
      // To pass this test, fill out the author selector
      // in ./src/extractors/custom/deadspin.com/index.js.
      const { author } = await result;

      // Update these values with the expected values from
      // the article.
      assert.equal(author, 'Chris Thompson');
    });

    it('returns the date_published', async () => {
      // To pass this test, fill out the date_published selector
      // in ./src/extractors/custom/deadspin.com/index.js.
      const { date_published } = await result;

      // Update these values with the expected values from
      // the article.
      assert.equal(date_published, '2016-10-13T16:34:00.000Z');
    });

    it('returns the lead_image_url', async () => {
      // To pass this test, fill out the lead_image_url selector
      // in ./src/extractors/custom/deadspin.com/index.js.
      const { lead_image_url } = await result;

      // Update these values with the expected values from
      // the article.
      assert.equal(
        lead_image_url,
        'https://i.kinja-img.com/gawker-media/image/upload/s--SUEXWZgf--/c_fill,fl_progressive,g_center,h_450,q_80,w_800/vmeayd7lteyycwzcdlju.jpg'
      );
    });

    it('returns the content', async () => {
      // To pass this test, fill out the content selector
      // in ./src/extractors/custom/deadspin.com/index.js.
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
        'Photo credit: Rob Carr/Getty Washington’s Danny Espinosa problem is inextricably linked to its'
      );
    });
  });

  it('handles lazy-loaded video', async () => {
    // To pass this test, fill out the content selector
    // in ./src/extractors/custom/deadspin.com/index.js.
    // You may also want to make use of the clean and transform
    // options.
    const html = fs.readFileSync('./fixtures/deadspin.com/1477505848605.html');
    const url =
      'http://deadspin.com/remember-when-donald-trump-got-booed-for-butchering-ta-1788216229';

    const { content } = await Mercury.parse(url, { html, fallback: false });

    const $ = cheerio.load(content || '');

    const youtube = $('iframe[src]');

    // Update these values with the expected values from
    // the article.
    assert.equal(youtube.length, 1);
  });

  describe('local.theonion.com test', () => {
    let result;
    let url;
    beforeAll(() => {
      url =
        'https://local.theonion.com/bride-only-one-not-relieved-about-postponed-wedding-dat-1843268098';
      const html = fs.readFileSync(
        './fixtures/deadspin.com/1588724219212.html'
      );
      result = Mercury.parse(url, { html, fallback: false });
    });

    it('is selected properly', () => {
      // This test should be passing by default.
      // It sanity checks that the correct parser
      // is being selected for URLs from this domain
      const extractor = getExtractor(url);
      assert.equal(extractor.domain, 'deadspin.com');
    });

    it('returns the title', async () => {
      // To pass this test, fill out the title selector
      // in ./src/extractors/custom/local.theonion.com/index.js.
      const { title } = await result;

      // Update these values with the expected values from
      // the article.
      assert.equal(
        title,
        `Bride Only One Not Relieved About Postponed Wedding Date`
      );
    });

    it('returns the author', async () => {
      // To pass this test, fill out the author selector
      // in ./src/extractors/custom/local.theonion.com/index.js.
      const { author } = await result;

      // Update these values with the expected values from
      // the article.
      assert.equal(author, null);
    });

    it('returns the date_published', async () => {
      // To pass this test, fill out the date_published selector
      // in ./src/extractors/custom/local.theonion.com/index.js.
      const { date_published } = await result;

      // Update these values with the expected values from
      // the article.
      assert.equal(date_published, '2020-05-05T19:51:00.000Z');
    });

    it('returns the dek', async () => {
      // To pass this test, fill out the dek selector
      // in ./src/extractors/custom/local.theonion.com/index.js.
      const { dek } = await result;

      // Update these values with the expected values from
      // the article.
      assert.equal(dek, null);
    });

    it('returns the lead_image_url', async () => {
      // To pass this test, fill out the lead_image_url selector
      // in ./src/extractors/custom/local.theonion.com/index.js.
      const { lead_image_url } = await result;

      // Update these values with the expected values from
      // the article.
      assert.equal(
        lead_image_url,
        'https://i.kinja-img.com/gawker-media/image/upload/c_fill,f_auto,fl_progressive,g_center,h_675,pg_1,q_80,w_1200/ybb2odaf5ug1rnmetk4g.jpg'
      );
    });

    it('returns the content', async () => {
      // To pass this test, fill out the content selector
      // in ./src/extractors/custom/local.theonion.com/index.js.
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
      assert.equal(first13, '');

      const figure = $('figure');
      assert.equal(figure.length, 1);
    });
  });

  describe('entertainment.theonion.com test', () => {
    let result;
    let url;
    beforeAll(() => {
      url =
        'https://entertainment.theonion.com/your-horoscopes-week-of-may-5-2020-1843259833';
      const html = fs.readFileSync(
        './fixtures/deadspin.com/1588727602000.html'
      );
      result = Mercury.parse(url, { html, fallback: false });
    });

    it('returns the content', async () => {
      // To pass this test, fill out the content selector
      // in ./src/extractors/custom/local.theonion.com/index.js.
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
        'Aries | March 21 to April 19After a long, sweaty, painful time trying'
      );

      const h4 = $('h4');
      assert.equal(h4.length, 12);
    });
  });
});
