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
];

function testFor(key, value, dir) {
  if (IGNORE.find(k => k === key)) return '';

  return template`
  it('returns the ${key}', async () => {
            // To pass this test, fill out the ${key} selector
            // in ${dir}/index.js.
            const { ${key} } = await result

            // Update these values with the expected values from
            // the article.
            assert.equal(${key}, ${value ? `\`${value}\`` : "''"})
          });
    `;
}

export default function(file, url, dir, result, name) {
  return template`
    import assert from 'assert';
    import URL from 'url';
    import cheerio from 'cheerio';

    import Mercury from 'mercury';
    import getExtractor from 'extractors/get-extractor';
    import { excerptContent } from 'utils/text';

    const fs = require('fs');

    describe('${name}', () => {
      describe('initial test case', () => {
        let result;
        let url;
        beforeAll(() => {
          url =
            '${url}';
          const html =
            fs.readFileSync('${file}');
          result =
            Mercury.parse(url, { html, fallback: false });
        });

        it('is selected properly', () => {
          // This test should be passing by default.
          // It sanity checks that the correct parser
          // is being selected for URLs from this domain
          const extractor = getExtractor(url);
          assert.equal(extractor.domain, URL.parse(url).hostname)
        })

          ${Reflect.ownKeys(result)
            .map(k => testFor(k, result[k], dir))
            .join('\n\n')}

        it('returns the content', async () => {
          // To pass this test, fill out the content selector
          // in ${dir}/index.js.
          // You may also want to make use of the clean and transform
          // options.
          const { content } = await result;

          const $ = cheerio.load(content || '');

          const first13 = excerptContent($('*').first().text(), 13)

          // Update these values with the expected values from
          // the article.
          assert.equal(first13, 'Add the first 13 words of the article here');
        });
      });
    });
  `;
}
