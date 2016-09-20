import assert from 'assert';
import { Errors } from 'utils';

import Resource from './index';

describe('Resource', () => {
  describe('create(url)', () => {
    it('fetches the page and returns a cheerio object', (async) () => {
      const url = 'http://theconcourse.deadspin.com/1786177057';
      const $ = await Resource.create(url);

      assert.equal(typeof $, 'function');
    });

    it('returns an error message if the url is malformed', (async) () => {
      const url = 'http://nytimes.com/500';
      const error = await Resource.create(url);

      assert.equal(error, Errors.badUrl);
    });
  });

  describe('generateDoc({ body, response })', () => {
    it('returns a cheerio object if valid', () => {
      const response = { headers: { 'content-type': 'text/html' } };

      const body = '<div><p>Hi</p></div>';
      const $ = Resource.generateDoc({ body, response });

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
      const response = {
        headers: {
          'content-type': 'html',
        },
      };
      const body = '';

      assert.throws(
        () => {
          Resource.generateDoc({ body, response });
        },
          /no children/i
      );
    });
  });
});
