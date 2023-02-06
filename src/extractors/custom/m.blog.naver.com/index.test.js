import assert from 'assert';
import URL from 'url';
import cheerio from 'cheerio';

import Parser from 'mercury';
import getExtractor from 'extractors/get-extractor';
import { excerptContent } from 'utils/text';

const fs = require('fs');

describe('MBlogNaverComExtractor', () => {
  describe('initial test case', () => {
    let result;
    let url;
    beforeAll(() => {
      url =
        'https://m.blog.naver.com/jjy0501/222999197655';
      const html =
        fs.readFileSync('./fixtures/m.blog.naver.com/1675688085042.html');
      result =
        Parser.parse(url, { html, fallback: false });
    });

    it('is selected properly', () => {
      // This test should be passing by default.
      // It sanity checks that the correct parser
      // is being selected for URLs from this domain
      const extractor = getExtractor(url);
      assert.equal(extractor.domain, URL.parse(url).hostname)
    })

      it('returns the title', async () => {
    const { title } = await result
    assert.equal(title, `우유 섭취가 농업 초기 시대 인류의 몸집을 키웠다?`)
  });

it('returns the author', async () => {
    const { author } = await result
    assert.equal(author, '고든')
  });

it('returns the date_published', async () => {
    const { date_published } = await result
    assert.equal(date_published, '2023-02-05T02:40:00.000Z')
  });

// m.blog.naver.com doesn't have dek.

it('returns the lead_image_url', async () => {
    const { lead_image_url } = await result
    assert.match(lead_image_url, /\/fresh-milk.jpg/);
  });

    it('returns the content', async () => {
      const { content } = await result;

      const $ = cheerio.load(content || '');

      const first13 = excerptContent($('*').first().text(), 13)

      // Check the first 13 words.
      assert.equal(first13, '(Credit: Pixabay/CC0 Public Domain)​ (Scatterplots with Lowess lines illustrating broad patterns of (A)')

      // Check if the image tags are extracted correctly as well.
      assert.match($('*').first().html(), /<img src="[^"]*\/fresh-milk.jpg/);
      assert.match($('*').first().html(), /<img src="[^"]*\/milk-consumption-incre.jpg/);
    });
  });
});
