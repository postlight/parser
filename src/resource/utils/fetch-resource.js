import URL from 'url';
import {
  FETCH_TIMEOUT,
  MAX_CONTENT_LENGTH,
  REQUEST_HEADERS,
} from './constants';

import { fetch } from './fetch';

// Evaluate a response to ensure it's something we should be keeping.
// This does not validate in the sense of a response being 200 or not.
// Validation here means that we haven't found reason to bail from
// further processing of this url.

export function validateResponse(response, parseNon200 = false) {
  // Check if we got a valid status code
  // This isn't great, but I'm requiring a statusMessage to be set
  // before short circuiting b/c nock doesn't set it in tests
  // statusMessage only not set in nock response, in which case
  // I check statusCode, which is currently only 200 for OK responses
  // in tests
  if (
    (response.statusText && response.statusText !== 'OK') ||
    response.status !== 200
  ) {
    if (!response.status) {
      throw new Error(
        `Unable to fetch content. Original exception was ${response.error}`
      );
    } else if (!parseNon200) {
      throw new Error(
        `Resource returned a response status code of ${
          response.status
        } and resource was instructed to reject non-200 status codes.`
      );
    }
  }

  const {
    'content-type': contentType = '',
    'content-length': contentLength,
  } = response.headers;

  // Check that the content length is below maximum
  if (contentLength > MAX_CONTENT_LENGTH) {
    throw new Error(
      `Content for this resource was too large. Maximum content length is ${MAX_CONTENT_LENGTH}.`
    );
  }

  // TODO: Implement is_text function from
  // https://github.com/ReadabilityHoldings/readability/blob/8dc89613241d04741ebd42fa9fa7df1b1d746303/readability/utils/text.py#L57
  if (
    !contentType ||
    (!contentType.includes('html') && !contentType.includes('text'))
  ) {
    throw new Error('Content does not appear to be text.');
  }

  return true;
}

// Grabs the last two pieces of the URL and joins them back together
// This is to get the 'livejournal.com' from 'erotictrains.livejournal.com'
export function baseDomain({ host }) {
  return host
    .split('.')
    .slice(-2)
    .join('.');
}

// Set our response attribute to the result of fetching our URL.
// TODO: This should gracefully handle timeouts and raise the
//       proper exceptions on the many failure cases of HTTP.
// TODO: Ensure we are not fetching something enormous. Always return
//       unicode content for HTML, with charset conversion.

function getHeaders(response) {
  return Array.from(response.headers.entries()).reduce((acc, [k, v]) => {
    acc[k] = v;
    return acc;
  }, {});
}

async function getBody(response) {
  return Buffer.from(await response.arrayBuffer());
}

async function request(headers, parsedUrl) {
  const options = {
    headers: { ...REQUEST_HEADERS, ...headers },
    timeout: FETCH_TIMEOUT,
  };

  const rawResponse = await fetch(parsedUrl.href, options);
  return {
    statusText: rawResponse.statusText,
    status: rawResponse.status,
    body: await getBody(rawResponse),
    headers: getHeaders(rawResponse),
  };
}

export default async function fetchResource(url, parsedUrl, headers = {}) {
  parsedUrl = parsedUrl || URL.parse(encodeURI(url));
  const response = await request(headers, parsedUrl);

  try {
    validateResponse(response);
    return {
      content: response.body,
      contentType: response.headers['content-type'],
    };
  } catch (e) {
    return {
      error: true,
      message: e.message,
    };
  }
}
