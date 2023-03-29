export const GothamistComExtractor = {
  domain: 'gothamist.com',

  supportedDomains: [
    'chicagoist.com',
    'laist.com',
    'sfist.com',
    'shanghaiist.com',
    'dcist.com',
  ],

  title: {
    selectors: ['h1', '.entry-header h1'],
  },

  author: {
    // There are multiple article-metadata and byline-author classes, but the main article's is the 3rd child of the l-container class
    selectors: ['.article-metadata:nth-child(3) .byline-author', '.author'],
  },

  date_published: {
    selectors: [
      ['meta[name="article:published_time"]', 'value'],
      'abbr',
      'abbr.published',
    ],
  },

  dek: {
    selectors: [null],
  },

  lead_image_url: {
    selectors: [['meta[name="og:image"]', 'value']],
  },

  content: {
    selectors: ['.article-body', '.entry-body'],

    // Is there anything in the content you selected that needs transformed
    // before it's consumable content? E.g., unusual lazy loaded images
    transforms: {
      'div.image-none': 'figure',
      '.image-none i': 'figcaption',
      'div.image-left': 'figure',
      '.image-left i': 'figcaption',
      'div.image-right': 'figure',
      '.image-right i': 'figcaption',
    },

    // Is there anything that is in the result that shouldn't be?
    // The clean selectors will remove anything that matches from
    // the result
    clean: [
      '.image-none br',
      '.image-left br',
      '.image-right br',
      '.galleryEase',
    ],
  },
};
