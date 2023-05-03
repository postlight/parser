import assert from 'assert';
import URL from 'url';
import cheerio from 'cheerio';

import Mercury from 'mercury';
import getExtractor from 'extractors/get-extractor';
import { excerptContent } from 'utils/text';

const fs = require('fs');

describe('SpektrumExtractor', () => {
  describe('initial test case', () => {
    let result;
    let url;
    beforeAll(() => {
      url =
        'https://www.spektrum.de/news/genetik-das-geheimnis-der-parasitischen-rafflesien/2039026';
      const html = fs.readFileSync('./fixtures/www.spektrum.de.html');
      result = Mercury.parse(url, { html, fallback: false });
    });

    it('is selected properly', () => {
      const extractor = getExtractor(url);
      assert.equal(extractor.domain, URL.parse(url).hostname);
    });

    it('returns the title', async () => {
      const { title } = await result;
      assert.equal(title, 'Das Geheimnis der parasitischen Riesenblumen');
    });

    it('returns the author', async () => {
      const { author } = await result;
      assert.equal(author, 'Christie Wilcox');
    });

    it('returns the date_published', async () => {
      const { date_published } = await result;
      // The article has '19.07.2022' which Mercury parses correctly as 0:00 CEST on the 19th of July
      // (we help it along by providing a timezone in our extractor that should match the location of the website)
      // and then converts to a UTC ISO string, so the result is 10 pm on the day before.
      // See also https://github.com/postlight/mercury-parser/issues/549
      assert.equal(date_published, '2022-07-18T22:00:00.000Z');
    });

    it('returns the dek', async () => {
      const { dek } = await result;
      assert.equal(
        dek,
        'Das bizarre Genom der größten Blütenpflanze der Welt offenbart, zu was Parasiten alles fähig sind: Sie stehlen, ' +
          'löschen und duplizieren DNA und manipulieren vielleicht sogar die Gene ihres Wirts. Etliche Details sind aber noch ungeklärt.'
      );
    });

    it('returns the lead_image_url', async () => {
      const { lead_image_url } = await result;
      assert.equal(
        lead_image_url,
        'https://static.spektrum.de/fm/912/f1920x1080/Rafflesia-arnoldii_AdobeStock_317147924_Maizal.jpeg'
      );
    });

    it('returns the content', async () => {
      const { content } = await result;

      const $ = cheerio.load(content || '');

      const first13 = excerptContent(
        $('*')
          .first()
          .text(),
        13
      );

      // This would be the true beginning of the content. But since we have to include the dek in the content
      // in order to be able to find it (see https://github.com/postlight/mercury-parser/issues/676),
      // the content will start with the dek instead.
      // assert.equal(first13, 'Auf den ersten Blick sind sie unsichtbar. In ihrer Heimat, den Wäldern Südostasiens,');
      assert.equal(
        first13,
        'Das bizarre Genom der größten Blütenpflanze der Welt offenbart, zu was Parasiten alles'
      );
    });
  });
});
