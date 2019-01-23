export const WwwCbssportsComExtractor = {
  domain: 'www.cbssports.com',

  title: {
    selectors: ['.article-headline'],
  },

  author: {
    selectors: ['.author-name'],
  },

  date_published: {
    selectors: [['.date-original-reading-time time', 'datetime']],
    timezone: 'UTC',
  },

  dek: {
    selectors: ['.article-subline'],
  },

  lead_image_url: {
    selectors: [['meta[name="og:image"]', 'value']],
  },

  content: {
    selectors: ['.article'],

    // Is there anything in the content you selected that needs transformed
    // before it's consumable content? E.g., unusual lazy loaded images
    transforms: {},

    // Is there anything that is in the result that shouldn't be?
    // The clean selectors will remove anything that matches from
    // the result
    clean: [],
  },
};
