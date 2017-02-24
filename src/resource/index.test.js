import assert from 'assert';
import cheerio from 'cheerio';
import { Errors } from 'utils';
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

      assert.equal(error, Errors.badUrl);
    });

    it('fetches with different encoding on body', async () => {
      const url = 'http://www.playnation.de/spiele-news/kojima-productions/hideo-kojima-reflektiert-ueber-seinen-werdegang-bei-konami-id68950.html';
      const $ = await Resource.create(url);
      const metaContentType = $('meta[http-equiv=content-type]').attr('value');

      assert.equal(getEncoding(metaContentType), 'iso-8859-1');
      assert.equal(typeof $, 'function');
    });

    it('handles special encoding', async () => {
      const url = 'http://www.elmundo.es/opinion/2016/11/19/582f476846163fc65a8b4578.html';
      const $ = await Resource.create(url);

      const badEncodingRe = /�/g;

      assert.equal(badEncodingRe.test($.html()), false);
      assert.equal(typeof $, 'function');
    });
  });

  describe('generateDoc({ body, response })', () => {
    it('returns a cheerio object if valid', () => {
      const response = { headers: { 'content-type': 'text/html' } };

      const body = '<div><p>Hi</p></div>';
      const buffer = Buffer.from(body, 'utf-8');
      const $ = Resource.generateDoc({ body: buffer, response });

      assert.equal($.html(), body);
    });

    it('throws an error if the content is not text', () => {
      const response = {
        headers: {
          'content-type': 'foo',
        },
      };
      const body = '';

      assert.throws(
        () => {
          Resource.generateDoc({ body, response });
        },
          /content does not appear to be text/i
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
        const buffer = Buffer.from(body, 'utf-8');

        assert.throws(
          () => {
            Resource.generateDoc({ body: buffer, response });
          },
            /no children/i
        );
      }
    });
  });
});
