import template from './index';

export default function (file, url, dir) {
  return template`
    import assert from 'assert';
    import fs from 'fs';
    import URL from 'url';
    import cheerio from 'cheerio';

    import Mercury from 'mercury';
    import getExtractor from 'extractors/get-extractor';

    // Rename CustomExtractor
    describe('CustomExtractor', () => {
      it('is selected properly', () => {
        // To pass this test, rename your extractor in
        // ${dir}/index.js
        // then add your new extractor to
        // src/extractors/all.js
        const url = '${url}';
        const extractor = getExtractor(url);
        assert.equal(extractor.domain, URL.parse(url).hostname)
      })

      it('works with a starter story', (async) () => {
        // To pass this test, begin filling out your
        // selectors in ${dir}/index.js. This test is just
        // a stub; you can add more fields to test as much of
        // your parser as possible.
        const html = fs.readFileSync('${file}');
        const uri = '${url}';

        const { content, title, author } = await Mercury.parse(uri, html);
        const $ = cheerio.load(content);
        const text = $('*').first()
                           .text()
                           .trim()
                           .slice(0, 20);

        // Update these values with the expected values from
        // the article.
        assert.equal(title, '');
        assert.equal(author, '');
        assert.equal(text, '');
      });
    });
  `;
}
