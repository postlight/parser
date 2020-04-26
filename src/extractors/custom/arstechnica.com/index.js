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

  content: {
    selectors: ['div[itemprop="articleBody"]'],

    // Is there anything in the content you selected that needs transformed
    // before it's consumable content? E.g., unusual lazy loaded images
    transforms: {
      h2: $node => {
        $node.before('<p></p>');
      },
    },

    // Is there anything that is in the result that shouldn't be?
    // The clean selectors will remove anything that matches from
    // the result
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
