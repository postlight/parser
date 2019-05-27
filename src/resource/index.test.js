import assert from 'assert';
import cheerio from 'cheerio';
import { getEncoding } from 'utils/text';

import { record } from 'test-helpers';
import Resource from './index';

describe('Resource', () => {
  const recorder = record('resource-test');
  beforeAll(recorder.before);
  afterAll(recorder.after);

  describe('create(url)', () => {
    it('fetches the page and returns a cheerio object', async () => {
      const url = 'http://theconcourse.deadspin.com/1786177057';
      const $ = await Resource.create(url);

      assert.equal(typeof $, 'function');
    });

    it('returns an error message if the url is malformed', async () => {
      const url = 'http://nytimes.com/500';
      const error = await Resource.create(url);

      assert(/instructed to reject non-200/i.test(error.message));
    });

    it('fetches with different encoding on body', async () => {
      const url =
        'http://www.playnation.de/spiele-news/kojima-productions/hideo-kojima-reflektiert-ueber-seinen-werdegang-bei-konami-id68950.html';
      const $ = await Resource.create(url);
      const metaContentType = $('meta[http-equiv=content-type]').attr('value');

      assert.equal(getEncoding(metaContentType), 'iso-8859-1');
      const encodedU = /&#xFC;/g;

      assert.equal(encodedU.test($.html()), true);
      assert.equal(typeof $, 'function');
    });

    it('fetches with different encoding and case insensitive regex', async () => {
      const url =
        'https://www.finam.ru/analysis/newsitem/putin-nagradil-grefa-ordenom-20190208-203615/';
      const $ = await Resource.create(url);
      const metaContentType = $('meta[http-equiv=content-type i]').attr(
        'value'
      );

      assert.equal(getEncoding(metaContentType), 'windows-1251');

      const badEncodingRe = /&#xFFFD;/g;

      assert.equal(badEncodingRe.test($.html()), false);
      assert.equal(typeof $, 'function');
    });

    it('fetches with different encoding and HTML5 charset tag', async () => {
      const url =
        'https://www.idnes.cz/fotbal/prvni-liga/fotbalova-liga-8-kolo-slovan-liberec-slovacko.A170925_173123_fotbal_min';
      const $ = await Resource.create(url);
      const metaContentType = $('meta[charset]').attr('charset');

      assert.equal(getEncoding(metaContentType), 'windows-1250');

      const badEncodingRe = /&#xFFFD;/g;

      assert.equal(badEncodingRe.test($.html()), false);
      assert.equal(typeof $, 'function');
    });

    it('handles special encoding', async () => {
      const url =
        'http://www.elmundo.es/opinion/2016/11/19/582f476846163fc65a8b4578.html';
      const $ = await Resource.create(url);

      const badEncodingRe = /�/g;

      assert.equal(badEncodingRe.test($.html()), false);
      assert.equal(typeof $, 'function');
    });
  });

  describe('generateDoc({ body, response })', () => {
    // Ideally the body would be a buffer, because of potential issues with
    // string re-encoding, since these strings are blank, it should be fine
    // but this is why iconv is throwing warnings.
    it('throws an error if the content is not text', () => {
      const response = {
        headers: {
          'content-type': 'foo',
        },
      };
      const body = '';

      assert.throws(() => {
        Resource.generateDoc({ body, response });
      }, /content does not appear to be text/i);
    });

    it('throws an error if the response has no Content-Type header', () => {
      const response = {
        headers: {},
      };
      const body = '';

      // This assertion is more elaborate than the others to be sure that we're
      // throwing an `Error` and not raising a runtime exception.
      assert.throws(
        () => {
          Resource.generateDoc({ body, response });
        },
        err =>
          err instanceof Error &&
          /content does not appear to be text/i.test(err)
      );
    });

    it('throws an error if the content has no children', () => {
      // jquery's parser won't work this way, and this is
      // an outside case
      if (!cheerio.browser) {
        const response = {
          headers: {
            'content-type': 'html',
          },
        };
        const body = '';

        assert.throws(() => {
          Resource.generateDoc({ body, response });
        }, /no children/i);
      }
    });
  });
});
