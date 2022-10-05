export const UproxxComExtractor = {
  domain: 'uproxx.com',

  title: {
    selectors: ['div.entry-header h1'],
  },

  author: {
    selectors: [['meta[name="qc:author"]', 'value']],
  },

  date_published: {
    selectors: [['meta[name="article:published_time"]', 'value']],
  },

  lead_image_url: {
    selectors: [['meta[name="og:image"]', 'value']],
  },

  content: {
    selectors: ['.entry-content'],

    // Is there anything in the content you selected that needs transformed
    // before it's consumable content? E.g., unusual lazy loaded images
    transforms: {
      'div.image': 'figure',
      'div.image .wp-media-credit': 'figcaption',
    },

    // Is there anything that is in the result that shouldn't be?
    // The clean selectors will remove anything that matches from
    // the result
    clean: [],
  },
};
