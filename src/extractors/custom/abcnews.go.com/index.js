export const AbcnewsGoComExtractor = {
  domain: 'abcnews.go.com',

  title: {
    selectors: ['.article-header h1'],
  },

  author: {
    selectors: ['.authors'],
    clean: ['.author-overlay', '.by-text'],
  },

  date_published: {
    selectors: ['.timestamp'],
    timezone: 'America/New_York',
  },

  lead_image_url: {
    selectors: [['meta[name="og:image"]', 'value']],
  },

  content: {
    selectors: ['.article-copy'],

    // Is there anything in the content you selected that needs transformed
    // before it's consumable content? E.g., unusual lazy loaded images
    transforms: {},

    // Is there anything that is in the result that shouldn't be?
    // The clean selectors will remove anything that matches from
    // the result
    clean: [],
  },
};
