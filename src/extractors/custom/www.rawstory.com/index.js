export const WwwRawstoryComExtractor = {
  domain: 'www.rawstory.com',

  title: {
    selectors: ['.blog-title'],
  },

  author: {
    selectors: ['.blog-author a:first-of-type'],
  },

  date_published: {
    selectors: ['.blog-author a:last-of-type'],

    timezone: 'EST',
  },

  lead_image_url: {
    selectors: [['meta[name="og:image"]', 'value']],
  },

  content: {
    selectors: ['.blog-content'],

    // Is there anything in the content you selected that needs transformed
    // before it's consumable content? E.g., unusual lazy loaded images
    transforms: {},

    // Is there anything that is in the result that shouldn't be?
    // The clean selectors will remove anything that matches from
    // the result
    clean: [],
  },
};
