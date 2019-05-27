import assert from 'assert';
import URL from 'url';
import cheerio from 'cheerio';

import Mercury from 'mercury';
import getExtractor from 'extractors/get-extractor';
import { excerptContent } from 'utils/text';

const fs = require('fs');

describe('WwwJnsaOrgExtractor', () => {
  describe('initial test case', () => {
    let result;
    let url;
    beforeAll(() => {
      url = 'https://www.jnsa.org/seminar/nsf/2019kansai/index.html';
      const html = fs.readFileSync(
        './fixtures/www.jnsa.org/1550897604793.html'
      );
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
      // in ./src/extractors/custom/www.jnsa.org/index.js.
      const { title } = await result;

      // Update these values with the expected values from
      // the article.
      assert.equal(
        title,
        `NSF 2019 in Kansai 「早期発見、早期対処」のセキュリティ\n～守りのセキュリティから攻めのセキュリティへ～`
      );
    });

    it('returns the author', async () => {
      // To pass this test, fill out the author selector
      // in ./src/extractors/custom/www.jnsa.org/index.js.
      const { author } = await result;

      // Update these values with the expected values from
      // the article.
      assert.equal(author, null);
    });

    it('returns the date_published', async () => {
      // To pass this test, fill out the date_published selector
      // in ./src/extractors/custom/www.jnsa.org/index.js.
      const { date_published } = await result;

      // Update these values with the expected values from
      // the article.
      assert.equal(date_published, null);
    });

    it('returns the dek', async () => {
      // To pass this test, fill out the dek selector
      // in ./src/extractors/custom/www.jnsa.org/index.js.
      const { dek } = await result;

      // Update these values with the expected values from
      // the article.
      assert.equal(dek, null);
    });

    it('returns the excerpt', async () => {
      // To pass this test, fill out the excerpt selector
      // in ./src/extractors/custom/www.jnsa.org/index.js.
      const { excerpt } = await result;

      // Update these values with the expected values from
      // the article.
      assert.equal(
        excerpt,
        'WannacryといったランサムウェアやMirai、SatoriといったIoTを狙ったマルウェア攻撃が増加しています。そして、今後、制御システムや工場のIIoTなどにも攻撃が増加し、広範囲にリスクが広がると見られており、行政、メディア、また各ベンダーから、「危ない！」、「対策を！」という声が多く出されています。しかし、今、こういうときだからこそ、冷静に地に足がついたセキュリティを考えてみませんか。サイバー攻撃は大きな脅威ですが、それ以前にヒューマンエラーやアップデートといった、基本的な運用に取り組んでいるのか、自組織が本当にさらされているリスクは何か、経営者はリスクを把握したうえで情報セキュリティへの投資につなげることができているのか、そのためにはどうすれば良いのか、といったことを考える機会を提供し、情報セキュリティ対策に関心を持って頂きたいと考えております。ぜひ多くの方の御参加をお待ちしております。'
      );
    });

    it('returns the lead_image_url', async () => {
      // To pass this test, fill out the lead_image_url selector
      // in ./src/extractors/custom/www.jnsa.org/index.js.
      const { lead_image_url } = await result;

      // Update these values with the expected values from
      // the article.
      assert.equal(
        lead_image_url,
        `https://www.jnsa.org/images/obj/img_thumb_seminar-event.png`
      );
    });

    it('returns the content', async () => {
      // To pass this test, fill out the content selector
      // in ./src/extractors/custom/www.jnsa.org/index.js.
      // You may also want to make use of the clean and transform
      // options.
      const { content } = await result;

      const $ = cheerio.load(content || '');

      const first13 = excerptContent(
        $('*')
          .first()
          .text(),
        2
      );

      // Update these values with the expected values from
      // the article.
      assert.equal(
        first13,
        '情報セキュリティ対策を予防、防御、検知、回復と分類すると、これまでは防御に重きをおいてきたのではないでしょうか。 システム設計には経営目標を実現し、インシデントが発生しても早期発見、早期対処をするための仕組みを盛り込むことが重要です。'
      );
    });
  });
});
