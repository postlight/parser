import assert from 'assert';
import URL from 'url';
import cheerio from 'cheerio';

import Mercury from 'mercury';
import getExtractor from 'extractors/get-extractor';
import { excerptContent } from 'utils/text';

const fs = require('fs');

describe('BookwalkerJpExtractor', () => {
  describe('initial test case', () => {
    let result;
    let url;
    beforeAll(() => {
      url = 'https://bookwalker.jp/de2b8f78c6-f6bb-4da9-8d15-202e8c6c185b/';
      const html = fs.readFileSync('./fixtures/bookwalker.jp.html');
      result = Mercury.parse(url, {
        html,
        fallback: false,
      });
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
      // in ./src/extractors/custom/bookwalker.jp/index.js.
      const { title } = await result;

      // Update these values with the expected values from
      // the article.
      assert.equal(title, `異世界おもいで食堂 ～偉人と和食のあったかゴハン～`);
    });

    it('returns the author', async () => {
      // To pass this test, fill out the author selector
      // in ./src/extractors/custom/bookwalker.jp/index.js.
      const { author } = await result;

      // Update these values with the expected values from
      // the article.
      assert.equal(author, '著者 お米ゴハン イラスト 汐街コナ');
    });

    it('returns the date_published', async () => {
      // To pass this test, fill out the date_published selector
      // in ./src/extractors/custom/bookwalker.jp/index.js.
      const { date_published } = await result;

      // Update these values with the expected values from
      // the article.
      assert.equal(date_published, '2019-03-04T15:00:00.000Z');
    });

    it('returns the dek', async () => {
      // To pass this test, fill out the dek selector
      // in ./src/extractors/custom/bookwalker.jp/index.js.
      const { dek } = await result;

      // Update these values with the expected values from
      // the article.
      assert.equal(dek, null);
    });

    it('returns the lead_image_url', async () => {
      // To pass this test, fill out the lead_image_url selector
      // in ./src/extractors/custom/bookwalker.jp/index.js.
      const { lead_image_url } = await result;

      // Update these values with the expected values from
      // the article.
      assert.equal(
        lead_image_url,
        `https://c.bookwalker.jp/7775823/t_700x780.jpg`
      );
    });

    it('returns the content', async () => {
      // To pass this test, fill out the content selector
      // in ./src/extractors/custom/bookwalker.jp/index.js.
      // You may also want to make use of the clean and transform
      // options.
      const { content } = await result;

      const $ = cheerio.load(content || '');

      const first13 = excerptContent(
        $('*')
          .first()
          .text(),
        9
      );

      // Update these values with the expected values from
      // the article.
      assert.equal(
        first13,
        '著者 お米ゴハン イラスト 汐街コナ 偉人の“おもいで”が紡ぐ、心あたたまるストーリーを召し上がれ！ 古今東西の偉人たちが転生し、暮らしている異世界――さくら小町。その一角に「おもいで食堂」と呼ばれる和食店があった。 板前の天宮勇士（あまみや・ゆうじ）は、この世界に転生してきた、平凡な青年。 ただの料理好きだった彼は、オーナーである《勝海舟》との奇妙な縁からこの食堂で働くことになり、現代ではなれなかった料理人としての人生を謳歌する。 味はもとより、料理で客の“おもいで”を刺激し、懐かしさを想起させる事もあって、店は徐々に知られていき、今ではすっかりさくら小町の隠れた名店となっていた。'
      );
    });
  });
});
