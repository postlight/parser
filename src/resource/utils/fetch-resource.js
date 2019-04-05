import URL from 'url';
import request from 'postman-request';

import {
  REQUEST_HEADERS,
  FETCH_TIMEOUT,
  BAD_CONTENT_TYPES_RE,
  MAX_CONTENT_LENGTH,
} from './constants';

function get(options) {
  return new Promise((resolve, reject) => {
    request(options, (err, response, body) => {
      if (err) {
        reject(err);
      } else {
        resolve({ body, response });
      }
    });
  });
}

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
    (response.statusMessage && response.statusMessage !== 'OK') ||
    response.statusCode !== 200
  ) {
    if (!response.statusCode) {
      throw new Error(
        `Unable to fetch content. Original exception was ${response.error}`
      );
    } else if (!parseNon200) {
      throw new Error(
        `Resource returned a response status code of ${
          response.statusCode
        } and resource was instructed to reject non-200 status codes.`
      );
    }
  }

  const {
    'content-type': contentType,
    'content-length': contentLength,
  } = response.headers;

  // Check that the content is not in BAD_CONTENT_TYPES
  if (BAD_CONTENT_TYPES_RE.test(contentType)) {
    throw new Error(
      `Content-type for this resource was ${contentType} and is not allowed.`
    );
  }

  // Check that the content length is below maximum
  if (contentLength > MAX_CONTENT_LENGTH) {
    throw new Error(
      `Content for this resource was too large. Maximum content length is ${MAX_CONTENT_LENGTH}.`
    );
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

export default async function fetchResource(url, parsedUrl, headers = {}) {
  parsedUrl = parsedUrl || URL.parse(encodeURI(url));
  const options = {
    url: parsedUrl.href,
    headers: { ...REQUEST_HEADERS, ...headers },
    timeout: FETCH_TIMEOUT,
    // Accept cookies
    jar: true,
    // Set to null so the response returns as binary and body as buffer
    // https://github.com/request/request#requestoptions-callback
    encoding: null,
    // Accept and decode gzip
    gzip: true,
    // Follow any non-GET redirects
    followAllRedirects: true,
    ...(typeof window !== 'undefined'
      ? {}
      : {
          // Follow GET redirects; this option is for Node only
          followRedirect: true,
        }),
  };

  const { response, body } = await get(options);

  try {
    validateResponse(response);
    return {
      body,
      response,
    };
  } catch (e) {
    return {
      error: true,
      message: e.message,
    };
  }
}
