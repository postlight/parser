export const WwwBustleComExtractor = {
  domain: 'www.bustle.com',

  title: {
    selectors: ['h1', 'h1.post-page__title'],
  },

  author: {
    selectors: ['a[href*="profile"]', 'div.content-meta__author'],
  },

  date_published: {
    selectors: [['time', 'datetime']],
  },

  lead_image_url: {
    selectors: [['meta[name="og:image"]', 'value']],
  },

  content: {
    selectors: ['article', '.post-page__body'],

    // Is there anything in the content you selected that needs transformed
    // before it's consumable content? E.g., unusual lazy loaded images
    transforms: {},

    // Is there anything that is in the result that shouldn't be?
    // The clean selectors will remove anything that matches from
    // the result
    clean: [],
  },
};
