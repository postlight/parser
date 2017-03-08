import assert from 'assert';
import fs from 'fs';
import URL from 'url';
import cheerio from 'cheerio';

import Mercury from 'mercury';
import getExtractor from 'extractors/get-extractor';
import { excerptContent } from 'utils/text';

describe('WwwFazNetExtractor', () => {
  describe('initial test case', () => {
    let result;
    let url;
    beforeAll(() => {
      url =
        'http://www.faz.net/aktuell/feuilleton/aus-dem-maschinenraum/ioactive-deckt-sicherheitsluecken-bei-robotern-auf-14910628.html';
      const html =
        fs.readFileSync('./fixtures/www.faz.net/1489006264342.html');
      result =
        Mercury.parse(url, html, { fallback: false });
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
    // in ./src/extractors/custom/www.faz.net/index.js.
      const { title } = await result;

    // Update these values with the expected values from
    // the article.
      assert.equal(title, 'Fehlende Datensicherheit: Angriff mit dem Roboter');
    });

    it('returns the author', async () => {
    // To pass this test, fill out the author selector
    // in ./src/extractors/custom/www.faz.net/index.js.
      const { author } = await result;

    // Update these values with the expected values from
    // the article.
      assert.equal(author, 'Constanze Kurz');
    });

    it('returns the date_published', async () => {
    // To pass this test, fill out the date_published selector
    // in ./src/extractors/custom/www.faz.net/index.js.
      const { date_published } = await result;

    // Update these values with the expected values from
    // the article.
      assert.equal(date_published, '2017-03-06T05:00:00.000Z');
    });

    it('returns the dek', async () => {
    // To pass this test, fill out the dek selector
    // in ./src/extractors/custom/www.faz.net/index.js.
      const { dek } = await result;

    // Update these values with the expected values from
    // the article.
      assert.equal(dek, 'Roboter können immer mehr, doch Sicherheit ist für viele Hersteller nicht so wichtig. Wer eine der Maschinen hackt, verfügt über einen Spion - oder eine tödliche Waffe.');
    });

    it('returns the lead_image_url', async () => {
    // To pass this test, fill out the lead_image_url selector
    // in ./src/extractors/custom/www.faz.net/index.js.
      const { lead_image_url } = await result;

    // Update these values with the expected values from
    // the article.
      assert.equal(lead_image_url, 'http://media1.faz.net/ppmedia/aktuell/3666612632/1.4911859/article_multimedia_overview/gita-ist-eine-art-rollende.jpg');
    });

    it('returns the pages_rendered', async () => {
    // To pass this test, fill out the pages_rendered selector
    // in ./src/extractors/custom/www.faz.net/index.js.
      const { pages_rendered } = await result;

    // Update these values with the expected values from
    // the article.
      assert.equal(pages_rendered, '2');
    });

    it('returns the content', async () => {
      // To pass this test, fill out the content selector
      // in ./src/extractors/custom/www.faz.net/index.js.
      // You may also want to make use of the clean and transform
      // options.
      const { content } = await result;

      const $ = cheerio.load(content || '');

      const first13 = excerptContent($('*').first().text(), 13);

      // Update these values with the expected values from
      // the article.
      assert.equal(first13, '© Piaggio „Gita“ ist eine Art rollende Einkaufstüte. Dringen aber Hacker in das');
    });
  });
});
