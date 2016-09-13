import 'babel-polyfill';

import cheerio from 'cheerio';

import { fetchResource } from './utils';
import {
  normalizeMetaTags,
  convertLazyLoadedImages,
  clean,
} from './utils/dom';

const Resource = {

  // Create a Resource.
  //
  // :param url: The URL for the document we should retrieve.
  // :param response: If set, use as the response rather than
  //                  attempting to fetch it ourselves. Expects a
  //                  string.
  async create(url, preparedResponse) {
    let result;

    if (preparedResponse) {
      const validResponse = {
        statusMessage: 'OK',
        statusCode: 200,
        headers: {
          'content-type': 'text/html',
          'content-length': 500,
        },
      };

      result = { body: preparedResponse, response: validResponse };
    } else {
      result = await fetchResource(url);
    }
    return this.generateDoc(result);
  },

  generateDoc({ body: content, response }) {
    const { 'content-type': contentType } = response.headers;

    // TODO: Implement is_text function from
    // https://github.com/ReadabilityHoldings/readability/blob/8dc89613241d04741ebd42fa9fa7df1b1d746303/readability/utils/text.py#L57
    if (!contentType.includes('html') &&
        !contentType.includes('text')) {
      throw new Error('Content does not appear to be text.');
    }

    let $ = cheerio.load(content, { normalizeWhitespace: true });

    if ($.root().children().length === 0) {
      throw new Error('No children, likely a bad parse.');
    }

    $ = normalizeMetaTags($);
    $ = convertLazyLoadedImages($);
    $ = clean($);

    return $;
  },
};

export default Resource;
//     def __init__(self, url, parse_non_2xx=False, response=None):
//         """ Create a Resource.
//
//             :param url: The URL for the document we should retrieve.
//             :param parse_non_2xx: If True, attempt to parse non-200 level
//                                   resources. If False, raise a RetrievalFailed
//                                   based exception. Default is False.
//             :param response: If not None, use as the response rather than
//                              attempting to fetch it ourselves. Expects a
//                              requests.models.Response object.
//         """
//         self.url = url
//         self.parse_non_2xx = parse_non_2xx
//
//         if response:
//             self.response = response
//         else:
//             self.response = self._fetch_resource()

// Iris: Human-friendly content extraction.

// import logging
// import lxml
// import re
// import requests
// import socket
//
// from django.conf import settings
// from lxml.etree import XPathEvaluator
// from lxml.html.clean import Cleaner
// from urlparse import urlparse
//
// from utils.dom import extract_by_selector as ebs, convert_lazy_loaded_images
// from utils.dom.attribmap import AttribMap
// from utils.statsd import stats
// from utils.text import is_text
// from utils.html import get_charset_from_html, strip_content_encodings
//
// from . import exceptions
//
// logger = logging.getLogger(__name__)
//
// # Hosts that are allowed to use embeds and iframes. We should be very
// # restrictive with this and only include top-tier video sites.
// host_whitelist = ['www.youtube.com', 'www.vimeo.com']
//
// # The number of seconds to attempt to fetch a resource before timing out.
// FETCH_TIMEOUT = 10
//
// cleaner = Cleaner(
//     style=True,
//     page_structure=False,
//     meta=False,
//     add_nofollow=False, # done by hand
//     remove_unknown_tags=False,
//     links=False,
//     host_whitelist=host_whitelist)
//
//
//
// class Resource(object):
//     """ A Resource is a wrapper class for an HTTP resource. Provides
//         functionality to fetch a resource as well as a handful of shortcut
//         methods to run xpath efficiently on HTML, etc.
//
//         Uses requests and lxml internally for fetching and querying.
//     """
//
//
//     def __init__(self, url, parse_non_2xx=False, response=None):
//         """ Create a Resource.
//
//             :param url: The URL for the document we should retrieve.
//             :param parse_non_2xx: If True, attempt to parse non-200 level
//                                   resources. If False, raise a RetrievalFailed
//                                   based exception. Default is False.
//             :param response: If not None, use as the response rather than
//                              attempting to fetch it ourselves. Expects a
//                              requests.models.Response object.
//         """
//         self.url = url
//         self.parse_non_2xx = parse_non_2xx
//
//         if response:
//             self.response = response
//         else:
//             self.response = self._fetch_resource()
//
//     def __unicode__(self):
//         return u'<Resource ({0})>'.format(self.url)
//
//     def __repr__(self):
//         return "<Resource ({0})>".format(self.url)
//
//     @classmethod
//     def fabricate(kls, url, content, headers=None):
//         """ Given a URL and some content, create a fake Resource that looks
//             as though it has already fetched the content. Useful for using
//             Resource objects without having to do a GET.
//         """
//
//         if type(content) != unicode:
//             raise TypeError("Provided content must be unicode.")
//
//         if headers is None:
//             headers = {}
//
//         try:
//             utf8_content = content.encode('utf-8', 'strict')
//         except UnicodeDecodeError:
//             logger.warning("Unable to encode content for url %s. Content "
//                             "should be unicode and encodeable at this point.")
//             utf8_content = content.encode('utf-8', 'replace')
//
//         mocked_response_dict = {
//             "cookies": {},
//             "_content": utf8_content,
//             "headers": dict({
//                 "content-length": len(content),
//                 "accept-ranges": "bytes",
//                 "vary": "Accept-Encoding,Cookie",
//                 "server": "Apache/2.2.21",
//                 "content-type": "text/html; charset=UTF-8"
//             }, **headers),
//             "url": url,
//             "status_code": 200,
//             "_content_consumed": False,
//             "request": None,
//             "raw": None,
//             "error": None,
//             "config": {
//                 "decode_unicode": True,
//                 "pool_connections": 10,
//                 "verbose": None,
//                 "keep_alive": True,
//                 "max_retries": 0,
//                 "base_headers": {
//                     "Accept-Encoding": "identity, deflate, compress, gzip",
//                     "Accept": "|)}>#*",
//                     "User-Agent": "python-requests/0.8.1"
//                 },
//                 "pool_maxsize": 10,
//                 "safe_mode": False,
//                 "max_redirects": 30
//             },
//             "history": []
//         }
//         mocked_response = requests.Response()
//         for k, v in mocked_response_dict.items():
//             setattr(mocked_response, k, v)
//
//         return Resource(
//             url = url,
//             response = mocked_response
//         )
//
//
//     @property
//     def url(self):
//         return self._url
//
//
//     @url.setter
//     def url(self, value):
//         parsed_url = urlparse(value)
//         if parsed_url.scheme not in ('http', 'https'):
//             raise ValueError("Resource only allows HTTP and HTTPS urls.")
//
//         if not parsed_url.netloc:
//             raise ValueError("Relative URLs are not allowed.")
//
//         self._url = value
//
//     _parsed_url = None
//     @property
//     def parsed_url(self):
//         if self._parsed_url is None:
//             self._parsed_url = urlparse(self.url)
//         return self._parsed_url
//
//     @property
//     def status_code(self):
//         return self.response.status_code
//
//
//     _content = None
//     @property
//     def content(self):
//         """Return the content for a resource. Always returns unicode.
//
//         """
//         if self._content is None:
//             # Requests that come in without content-type encoding headers will
//             # default to iso-8859-1, which could be wrong
//             if (self.response.encoding and
//                 self.response.encoding.lower() == 'iso-8859-1'):
//                 # Dont send unicode, because it could have been decoded wrong
//                 # by an incorrect content-type guess.
//                 encoding = get_charset_from_html(self.response.content) or 'iso-8859-1'
//
//                 if encoding != self.response.encoding:
//                     # First, try to use the encoding we found in the markup
//                     try:
//                         self._content = self.response.content.decode(encoding)
//                     except (LookupError, UnicodeDecodeError):
//                         stats.increment(
//                             'iris.resource.encoding.encoding_mismatch')
//                         # That encoding might be wrong though, so if it is, use
//                         # the one it reported since they could have the wrong
//                         # one set in the markup. eg. sending the content over
//                         # as iso but declaring it to be utf-8 like gq.com does.
//                         # We may also end up with an invalid encoding type, at
//                         # which point we should also just use the request
//                         # encoding and replace silently.
//                         self._content = self.response.content.decode(
//                             self.response.encoding, 'replace')
//                 else:
//                     # If the encoding guess was right, just use the unicode
//                     self._content = self.response.text
//
//             else:
//                 # Otherwise we trust the encoding
//                 self._content = self.response.text
//
//         return self._content
//
//
//     @property
//     def content_type(self):
//         return self.response.headers.get('content-type', '')
//
//
//     @property
//     def is_html(self):
//         if 'html' in self.content_type:
//             return True
//
//         # Otherwise, just try parsing it and see if it succeeds
//         try:
//             return (self.doc is not None)
//         except:
//             return False
//
//     @property
//     def is_plaintext(self):
//         if 'text/plain' in self.content_type:
//             return True
//
//         return False
//
//     @property
//     def is_image(self):
//         if 'image' in self.content_type:
//             return True
//
//         return False
//
//     @property
//     def is_pdf(self):
//         if 'pdf' in self.content_type:
//             return True
//
//         return False
//
//     _lxml_doc = None
//     @property
//     def doc(self):
//         if self._lxml_doc is None:
//             self._generate_lxml_doc()
//
//         return self._lxml_doc
//
//     _docxp = None
//     @property
//     def docxp(self):
//         """ Generate an XPath Evaluator for this doc. """
//         if self._docxp is None:
//             self._docxp = XPathEvaluator(self.doc)
//
//         return self._docxp
//
//     _redocxp = None
//     @property
//     def redocxp(self):
//         """ Generate an XPath Evaluator for this doc, that includes the RE
//             namespace for regular expression matching.
//
//         """
//         if self._redocxp is None:
//             _rens = {'re':'http://exslt.org/regular-expressions'}
//             self._redocxp = XPathEvaluator(self.doc, namespaces=_rens)
//
//         return self._redocxp
//
//     def _generate_lxml_doc(self):
//         # First check if we have a text based resource
//         if (not 'html' in self.content_type and
//             not 'text' in self.content_type and
//             not is_text(self.content[:512])):
//                 raise ValueError("Content does not appear to be text.")
//
//
//         # Remove useless carriage returns which get parsed as &#13; otherwise
//         content = re.sub(r'(\n\r|\r\n)', '\n', self.content)
//
//         # Dont pass any content encodings into lxml, it is dumb about them
//         content = strip_content_encodings(content)
//
//         self._lxml_doc = lxml.html.fromstring(content)
//
//
//
//
//         if len(self._lxml_doc.getchildren()) == 0:
//             stats.increment('iris.resource.encoding.no_children')
//             raise ValueError("No children, likely a bad parse.")
//
//
//         # Sometimes, lxml (or BeautifulSoup) will wrap the whole document
//         # in an extra html tag. This screws up a whole bunch of things in
//         # the parsing process. If this is the case, reset the doc to the
//         # ACTUAL root of the doc.
//         # Sample cases:
//         # * Strange Doctype causing issues: http://bit.ly/IATz0B
//         # * Messy markup causing double HTML tags: http://bit.ly/IGOq4o
//         # Also check for a body inside of our internal HTML tag, to determine
//         # that it's not just a junk HTML tag sibling at the bottom of the
//         # doc or something.
//         internal_html_tag = self._lxml_doc.find('html')
//         if (internal_html_tag is not None and
//             len(internal_html_tag.xpath('.//body')) > 0):
//             self._lxml_doc = internal_html_tag
//
//         self._normalize_meta_tags()
//
//         self._lxml_doc.make_links_absolute(self.url)
//
//         # Convert any lazy loaded images into normal images before clean_html
//         # which will strip all other attributes
//         self._lxml_doc = convert_lazy_loaded_images(self._lxml_doc)
//
//         # Clean the doc of anything malicious.
//         self._lxml_doc = cleaner.clean_html(self._lxml_doc)
//
//         # Manually nofollow links so that we don't clobber rel author
//         # Workaround for https://bugs.launchpad.net/lxml/+bug/971754
//         for a in self.docxp('//a'):
//             if a.attrib.get('rel', None):
//                 rel_attribs = set(a.attrib['rel'].split())
//                 rel_attribs.add('nofollow')
//                 a.attrib['rel'] = ' '.join(rel_attribs)
//             else:
//                 a.attrib['rel'] = 'nofollow'
//
//         # Re-relativize anchor links
//         anchor_link_xpath = ("//a[starts-with(@href, '%s#')]" %
//                              self.url.replace("'", "%27"))
//         for link in self.docxp(anchor_link_xpath):
//             link.attrib['href'] = link.attrib['href'].replace(self.url, '')
//
//
//     _attrib_map = None
//     @property
//     def attrib_map(self):
//         """ Create an AttribMap object for fast checking of class/id existence
//             in the document. Used in association with extract_by_selector.
//
//         """
//         if self._attrib_map is None:
//             self._attrib_map = AttribMap(self.doc)
//
//         return self._attrib_map
//
//
//     def extract_by_selector(self, selector):
//         " Shortcut to run extract_by_selector on our doc with our AttribMap. "
//         return ebs(self.doc, selector, self.attrib_map, self.docxp)
//
//
