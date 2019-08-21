import assert from 'assert';
import URL from 'url';
import cheerio from 'cheerio';

import Mercury from 'mercury';
import getExtractor from 'extractors/get-extractor';
import { excerptContent } from 'utils/text';

const fs = require('fs');

describe('BiorxivOrgExtractor', () => {
  describe('initial test case', () => {
    let result;
    let url;

    beforeAll(() => {
      url = 'https://biorxiv.org/content/10.1101/696633v1';
      const html = fs.readFileSync('./fixtures/biorxiv.org/1565356858754.html');
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
      // in ./src/extractors/custom/biorxiv.org/index.js.
      const { title } = await result;

      // Update these values with the expected values from
      // the article.
      assert.equal(
        title,
        `Sub-nucleosomal organization in urine cell-free DNA`
      );
    });

    it('returns the author', async () => {
      // To pass this test, fill out the author selector
      // in ./src/extractors/custom/biorxiv.org/index.js.
      const { author } = await result;

      // Update these values with the expected values from
      // the article.
      assert.equal(
        author,
        'Havell Markus, Jun Zhao, Tania Contente-Cuomo, View ORCID ProfileElizabeth Raupach, Ahuva Odenheimer-Bergman, Sydney Connor, Bradon R. McDonald, Elizabeth Hutchins, Marissa McGilvery, Michelina C. de la Maza, Kendall Van Keuren-Jensen, Patrick Pirrotte, Ajay Goel, Carlos Becerra, Daniel D. Von Hoff, Scott A. Celinski, Pooja Hingorani, View ORCID ProfileMuhammed Murtaza'
      );
    });

    it('returns the content', async () => {
      // To pass this test, fill out the content selector
      // in ./src/extractors/custom/biorxiv.org/index.js.
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
        'Cell-free DNA (cfDNA) in urine is a promising analyte for noninvasive diagnostics. However,'
      );
    });
  });
});
