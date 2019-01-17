import cheerio from 'cheerio';

// Browser does not like us setting user agent
export const REQUEST_HEADERS = cheerio.browser
  ? {}
  : {
      'User-Agent':
        'Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2228.0 Safari/537.36',
    };

// The number of milliseconds to attempt to fetch a resource before timing out.
export const FETCH_TIMEOUT = 10000;

// Content types that we do not extract content from
const BAD_CONTENT_TYPES = [
  'audio/mpeg',
  'image/gif',
  'image/jpeg',
  'image/jpg',
];

export const BAD_CONTENT_TYPES_RE = new RegExp(
  `^(${BAD_CONTENT_TYPES.join('|')})$`,
  'i'
);

// Use this setting as the maximum size an article can be
// for us to attempt parsing. Defaults to 5 MB.
export const MAX_CONTENT_LENGTH = 5242880;

// Turn the global proxy on or off
// Proxying is not currently enabled in Python source
// so not implementing logic in port.
export const PROXY_DOMAINS = false;
export const REQUESTS_PROXIES = {
  http: 'http://38.98.105.139:33333',
  https: 'http://38.98.105.139:33333',
};

export const DOMAINS_TO_PROXY = ['nih.gov', 'gutenberg.org'];
