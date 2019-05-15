import assert from 'assert';
import URL from 'url';
import cheerio from 'cheerio';

import Mercury from 'mercury';
import getExtractor from 'extractors/get-extractor';
import { excerptContent } from 'utils/text';

const fs = require('fs');

describe('WwwLemondeFrExtractor', () => {
  describe('initial test case', () => {
    let result;
    let url;
    beforeAll(() => {
      url =
        'https://www.lemonde.fr/economie/article/2019/05/07/dans-ses-previsions-economiques-bruxelles-confirme-la-montee-des-perils_5459325_3234.html';
      const html = fs.readFileSync(
        './fixtures/www.lemonde.fr/1557235525251.html'
      );
      result = Mercury.parse(url, { html, fallback: false });
    });

    it('is selected properly', () => {
      const extractor = getExtractor(url);
      assert.equal(extractor.domain, URL.parse(url).hostname);
    });

    it('returns the title', async () => {
      const { title } = await result;

      assert.equal(
        title,
        `Les sombres perspectives économiques de la Commission européenne`
      );
    });

    it('returns the author', async () => {
      const { author } = await result;

      assert.equal(author, `Cécile Ducourtieux`);
    });

    it('returns the date_published', async () => {
      const { date_published } = await result;

      assert.equal(date_published, `2019-05-07T11:59:43.000Z`);
    });

    it('returns the dek', async () => {
      const { dek } = await result;

      assert.equal(
        dek,
        'Elle abaisse ses prévisions pour 2019, avec un PIB à 1,4 % pour l’ensemble de l’UE, et à 1,2 % pour la zone euro.'
      );
    });

    it('returns the lead_image_url', async () => {
      const { lead_image_url } = await result;

      assert.equal(
        lead_image_url,
        `https://img.lemde.fr/2019/05/07/316/0/3824/1912/1440/720/60/0/d105b14_dfjDE1I-caggQrT4gvHf2nZP.jpg`
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

      assert.equal(
        first13,
        'Les dirigeants européens qui doivent se réunir, jeudi 9 mai à Sibiu (Roumanie),'
      );
    });
  });
});
