export const ArstechnicaComExtractor = {
  domain: 'arstechnica.com',

  // Articles from this site are often paginated, but I was unable to write a CSS
  // selector to find the next page. On the last page, there will be a link with a CSS
  // selector indicating that the previous page is next. But the parser appears to find
  // the next page without this extractor finding it, as long as the fallback option is
  // left at its default value of true.

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
