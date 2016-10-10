import template from './index';

const IGNORE = [
  'url',
  'domain',
  'content',
  'word_count',
  'next_page_url',
  'excerpt',
  'direction',
  'total_pages',
  'rendered_pages',
]

function testFor(key, value, dir, file, url) {
  if (IGNORE.find(k => k === key)) return ''

  return template`
  it('returns the ${key}', async () => {
            // To pass this test, fill out the ${key} selector
            // in ${dir}/index.js.
            const html =
              fs.readFileSync('${file}');
            const articleUrl =
              '${url}';

            const { ${key} } =
              await Mercury.parse(articleUrl, html, { fallback: false });

            // Update these values with the expected values from
            // the article.
            assert.equal(${key}, ${value ? "'" + value + "'" : "''"})
          });
    `;
}

export default function (file, url, dir, result) {
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
        // (e.g., CustomExtractor => NYTimesExtractor)
        // then add your new extractor to
        // src/extractors/all.js
        const url =
          '${url}';
        const extractor = getExtractor(url);
        assert.equal(extractor.domain, URL.parse(url).hostname)
      })

        ${Reflect.ownKeys(result).map(k => testFor(k, result[k], dir, file, url)).join('\n\n')}

      it('returns the content', async () => {
        // To pass this test, fill out the content selector
        // in ${dir}/index.js.
        // You may also want to make use of the clean and transform
        // options.
        const html =
          fs.readFileSync('${file}');
        const url =
          '${url}';

        const { content } =
          await Mercury.parse(url, html, { fallback: false });

        const $ = cheerio.load(content || '');

        const first13 = $('*').first()
                              .text()
                              .trim()
                              .split(/\\s+/)
                              .slice(0, 13)
                              .join(' ')

        // Update these values with the expected values from
        // the article.
        assert.equal(first13, null);
      });
    });
  `;
}
