import assert from 'assert';
import URL from 'url';
import cheerio from 'cheerio';

import Mercury from 'mercury';
import getExtractor from 'extractors/get-extractor';
import { excerptContent } from 'utils/text';

const fs = require('fs');

describe('WiredJpExtractor', () => {
  describe('initial test case', () => {
    let result;
    let url;
    beforeAll(() => {
      url = 'https://wired.jp/2019/04/25/helvetica-now/';
      const html = fs.readFileSync('./fixtures/wired.jp.html');
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
      // in ./src/extractors/custom/wired.jp/index.js.
      const { title } = await result;

      // Update these values with the expected values from
      // the article.
      assert.equal(
        title,
        `あの有名フォント「Helvetica」は、こうしてデジタル時代に生まれ変わった`
      );
    });

    it('returns the author', async () => {
      // To pass this test, fill out the author selector
      // in ./src/extractors/custom/wired.jp/index.js.
      const { author } = await result;

      // Update these values with the expected values from
      // the article.
      assert.equal(author, 'Arielle Pardes');
    });

    it('returns the date_published', async () => {
      // To pass this test, fill out the date_published selector
      // in ./src/extractors/custom/wired.jp/index.js.
      const { date_published } = await result;

      // Update these values with the expected values from
      // the article.
      assert.equal(date_published, `2019-04-25T07:00:25.000Z`);
    });

    it('returns the dek', async () => {
      // To pass this test, fill out the dek selector
      // in ./src/extractors/custom/wired.jp/index.js.
      const { dek } = await result;

      // Update these values with the expected values from
      // the article.
      assert.equal(
        dek,
        '世界で最も多く使われているであろうフォントのひとつ「Helvetica」が、このほどリニューアルを遂げた。まるで水のように生活に浸透しているフォントのデザインは、いかに伝統を守りながら、デジタル時代に合わせて最適化されたのか。'
      );
    });

    it('returns the lead_image_url', async () => {
      // To pass this test, fill out the lead_image_url selector
      // in ./src/extractors/custom/wired.jp/index.js.
      const { lead_image_url } = await result;

      // Update these values with the expected values from
      // the article.
      assert.equal(
        lead_image_url,
        `https://media.wired.jp/photos/61ce7c3feca9c13f76376390/16:9/w_1280,c_limit/5d08c7d457813df29e12d93c9b6f869f.jpg`
      );
    });

    it('returns the content', async () => {
      // To pass this test, fill out the content selector
      // in ./src/extractors/custom/wired.jp/index.js.
      // You may also want to make use of the clean and transform
      // options.
      const { content } = await result;

      const $ = cheerio.load(content || '');

      const first13 = excerptContent(
        $('*')
          .first()
          .text(),
        1
      );

      // Update these values with the expected values from
      // the article.
      assert.equal(
        first13,
        '「Helvetica」は、おそらく世界で最もよく使われているフォントだろう。1957年に誕生したこの書体を紹介する動画は、「Helveticaは水のようだ」というナレーションで始まる。サンセリフの簡素な字形には「ユビキタス」という形容詞がぴったりで、ニューヨーク市の地下鉄の案内表示や、アメリカン航空、アメリカンアパレルといった企業のロゴに採用されている。このフォントで「John'
      );
    });
  });
});
