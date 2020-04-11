import assert from 'assert';
import URL from 'url';
import nock from 'nock';

import { record } from 'test-helpers';
import fetchResource, { baseDomain, validateResponse } from './fetch-resource';
import { MAX_CONTENT_LENGTH } from './constants';

describe('fetchResource(url)', () => {
  const recorder = record('fetch-resource-test');
  beforeAll(recorder.before);
  afterAll(recorder.after);

  it('returns appropriate json for bad url', async () => {
    const url = 'http://www.nytimes.com/500';
    const { error } = await fetchResource(url);

    assert.equal(error, true);
  });

  it('passes custom headers in requests', async () => {
    const url = 'https://example.com';
    const parsedUrl = URL.parse(url);
    const headers = {
      'my-custom-header': 'Lorem ipsum dolor sit amet',
    };
    nock(url)
      .get('/')
      .reply(function() {
        return [
          200,
          this.req.headers['my-custom-header'][0], // request headers in body
          { 'Content-Type': 'text/html' },
        ];
      });

    const result = await fetchResource(url, parsedUrl, headers);

    assert.equal(result.content.toString(), 'Lorem ipsum dolor sit amet');
  });

  it('returns a buffer as its content', async () => {
    const url =
      'http://www.nytimes.com/2016/08/16/upshot/the-state-of-the-clinton-trump-race-is-it-over.html?_r=0';
    const result = await fetchResource(url);

    assert.equal(typeof result.content, 'object');
  });

  it('fetches nyt', async () => {
    const url =
      'http://www.nytimes.com/2016/08/16/upshot/the-state-of-the-clinton-trump-race-is-it-over.html?_r=0';
    const { content, contentType } = await fetchResource(url);

    assert.notEqual(content.toString(), undefined);
    assert.equal(contentType, 'text/html; charset=utf-8');
  });

  it('handles this gzip error', async () => {
    const url =
      'http://www.redcross.ca/blog/2016/11/photo-of-the-day--one-year-anniversary-of-the-end-of-ebola-in-sierra-leone';
    const { content } = await fetchResource(url);

    assert.notEqual(content.toString(), undefined);
  });
});

describe('validateResponse(response)', () => {
  it('validates a response object', () => {
    const validResponse = {
      statusMessage: 'OK',
      status: 200,
      headers: {
        'content-type': 'text/html',
        'content-length': 500,
      },
    };

    assert.equal(validateResponse(validResponse), true);
  });

  it('throws an error if there is no status code', () => {
    const invalidResponse = {};

    assert.throws(() => {
      validateResponse(invalidResponse);
    }, /unable to fetch content/i);
  });

  it('throws an error if response code is not 200', () => {
    const invalidResponse = {
      status: 500,
    };

    assert.throws(() => {
      validateResponse(invalidResponse);
    }, /instructed to reject non-200/i);
  });

  it('throws an error if the response has no content-type header', () => {
    const invalidResponse = {
      statusText: 'OK',
      status: 200,
      headers: {
        'content-length': 500,
      },
    };

    assert.throws(
      () => {
        validateResponse(invalidResponse);
      },
      err =>
        err instanceof Error && /content does not appear to be text/i.test(err)
    );
  });

  it('throws an error if response has bad content-type', () => {
    const invalidResponse = {
      statusText: 'OK',
      status: 200,
      headers: {
        'content-type': 'image/gif',
        'content-length': 500,
      },
    };

    assert.throws(() => {
      validateResponse(invalidResponse);
    }, /Content does not appear to be text./i);
  });

  it('throws an error if response length is > max', () => {
    const invalidResponse = {
      statusText: 'OK',
      status: 200,
      headers: {
        'content-type': 'text/html',
        'content-length': MAX_CONTENT_LENGTH + 1,
      },
    };

    assert.throws(() => {
      validateResponse(invalidResponse);
    }, /Content for this resource was too large/i);
  });
});

describe('baseDomain(parsedUrl)', () => {
  it('returns the base domain, excluding subdomain', () => {
    const url = 'https://www.npmjs.com/package/request#streaming';
    const parsedUrl = URL.parse(url);

    assert.equal(baseDomain(parsedUrl), 'npmjs.com');
  });

  it('returns the base domain as is if no subdomain', () => {
    const url = 'https://npmjs.com/package/request#streaming';
    const parsedUrl = URL.parse(url);

    assert.equal(baseDomain(parsedUrl), 'npmjs.com');
  });
});
