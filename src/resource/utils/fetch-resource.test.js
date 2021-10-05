import assert from 'assert';
import URL from 'url';
import { Response } from 'cross-fetch';

import { record } from 'test-helpers';
import { fetchResource, baseDomain, validateResponse } from './fetch-resource';
import { MAX_CONTENT_LENGTH } from './constants';

describe('fetchResource(url)', () => {
  const recorder = record('fetch-resource-test');
  beforeAll(recorder.before);
  afterAll(recorder.after);

  it('returns appropriate json for bad url', async () => {
    const url = 'http://www.nytimes.com/500';
    const { type } = await fetchResource(url);

    assert.equal(type, 'error');
  });

  it('passes custom headers in requests', async () => {
    // A GET request to this endpoint returns the list of all request headers as part of the response JSON
    const url = 'https://postman-echo.com/headers';
    const parsedUrl = URL.parse(url);
    const headers = {
      'my-custom-header': 'Lorem ipsum dolor sit amet',
    };
    const result = await fetchResource(url, parsedUrl, headers);
    const body = JSON.parse(result.body.toString());

    assert.equal(
      body.headers['my-custom-header'],
      'Lorem ipsum dolor sit amet'
    );
  });

  it('returns a buffer as its body', async () => {
    const url =
      'http://www.nytimes.com/2016/08/16/upshot/the-state-of-the-clinton-trump-race-is-it-over.html?_r=0';
    const result = await fetchResource(url);

    assert.equal(typeof result.body, 'object');
  });

  it('fetches nyt', async () => {
    const url =
      'http://www.nytimes.com/2016/08/16/upshot/the-state-of-the-clinton-trump-race-is-it-over.html?_r=0';
    const { type } = await fetchResource(url);

    assert.equal(type, 'success');
  });

  it('fetches domains', async () => {
    const url = 'http://theconcourse.deadspin.com/1786177057';
    const { type } = await fetchResource(url);

    assert.equal(type, 'success');
  });

  it('fetches nyt', async () => {
    const url =
      'http://www.nytimes.com/2016/08/16/upshot/the-state-of-the-clinton-trump-race-is-it-over.html?_r=0';
    const { type } = await fetchResource(url);

    assert.equal(type, 'success');
  });

  it('handles this gzip error', async () => {
    const url =
      'http://www.redcross.ca/blog/2016/11/photo-of-the-day--one-year-anniversary-of-the-end-of-ebola-in-sierra-leone';
    const { type } = await fetchResource(url);

    assert.equal(type, 'success');
  });
});

describe('validateResponse(response)', () => {
  it('validates a response object', () => {
    const validResponse = new Response(null, {
      statusText: 'OK',
      status: 200,
      headers: {
        'content-type': 'text/html',
        'content-length': 500,
      },
    });

    assert.equal(validateResponse(validResponse), true);
  });

  it('throws an error if response code is not 200', () => {
    const invalidResponse = new Response(null, {
      status: 500,
    });

    assert.throws(() => {
      validateResponse(invalidResponse);
    }, /instructed to reject non-200/i);
  });

  it('throws an error if response has bad content-type', () => {
    const invalidResponse = new Response(null, {
      statusText: 'OK',
      status: 200,
      headers: {
        'content-type': 'image/gif',
        'content-length': 500,
      },
    });

    assert.throws(() => {
      validateResponse(invalidResponse);
    }, /content-type for this resource/i);
  });

  it('throws an error if response length is > max', () => {
    const invalidResponse = new Response(null, {
      statusText: 'OK',
      status: 200,
      headers: {
        'content-type': 'text/html',
        'content-length': MAX_CONTENT_LENGTH + 1,
      },
    });

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
