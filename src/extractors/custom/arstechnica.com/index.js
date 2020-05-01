export const ArstechnicaComExtractor = {
  domain: 'arstechnica.com',

  title: {
    selectors: ['title'],
  },

  author: {
    selectors: ['*[rel="author"] *[itemprop="name"]'],
  },

  date_published: {
    selectors: [['.byline time', 'datetime']],
  },

  dek: {
    selectors: ['h2[itemprop="description"]'],
  },

  lead_image_url: {
    selectors: [['meta[name="og:image"]', 'value']],
  },

  // Articles from this site are often paginated, but I was unable to write a CSS
  // selector to find the next page. On the last page, there will be a link with a CSS
  // selector indicating that the previous page is next. So I implemented the ability to
  // specify the next_page_url (and other attributes) with locator function.
  next_page_url: {
    locator: ($, url) => {
      function pageNumberFromUrl(pageUrl) {
        const components = pageUrl.split('/');
        if (components.length < 1) {
          return 1;
        }
        const lastComponent = components[components.length - 1];
        const pageNumber = parseInt(lastComponent, 10);
        if (Number.isNaN(pageNumber)) {
          return 1;
        }
        return pageNumber;
      }

      let nextPageUrl = $(
        'nav.page-numbers span.numbers a:has(span.next)'
      ).attr('href');
      if (nextPageUrl) {
        // Removing the slash here avoids us fetching pages 2 through _n_ a second time
        // because the generic parser finds a different link to ".../2/", etc.
        if (nextPageUrl.endsWith('/')) {
          nextPageUrl = nextPageUrl.substring(0, nextPageUrl.length - 1);
        }

        // On the next page, the nextPageUrl selector above will find a "next" link to
        // a prior page. So here we parse the page numbers out of the URL to ensure that
        // the next page number is what we expect.
        const currentPageNumber = pageNumberFromUrl(url);
        const nextPageNumber = pageNumberFromUrl(nextPageUrl);
        if (nextPageNumber === currentPageNumber + 1) {
          return nextPageUrl;
        }
      }
      return null;
    },
  },

  content: {
    selectors: ['div[itemprop="articleBody"]'],

    // Is there anything in the content you selected that needs transformed
    // before it's consumable content? E.g., unusual lazy loaded images
    transforms: {
      h2: $node => {
        // Some pages have an element h2 that is significant, and that the parser will
        // remove if not following a paragraph. Adding this empty paragraph fixes it, and
        // the empty paragraph will be removed anyway.
        $node.before('<p></p>');
      },
    },

    // Is there anything that is in the result that shouldn't be?
    // The clean selectors will remove anything that matches from
    // the result.
    clean: [
      // Remove enlarge links and separators inside image captions.
      'figcaption .enlarge-link',
      'figcaption .sep',

      // I could not transform the video into usable elements, so I
      // removed them.
      'figure.video',

      // Image galleries that do not work.
      '.gallery',

      'aside',
      '.sidebar',
    ],
  },
};
