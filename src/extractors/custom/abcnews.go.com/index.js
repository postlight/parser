export const AbcnewsGoComExtractor = {
  domain: 'abcnews.go.com',

  title: {
    selectors: ['div[class*="Article_main__body"] h1', '.article-header h1'],
  },

  author: {
    selectors: ['.ShareByline span:nth-child(2)', '.authors'],
    clean: ['.author-overlay', '.by-text'],
  },

  date_published: {
    selectors: ['.ShareByline', '.timestamp'],
    format: 'MMMM D, YYYY h:mm a',
    timezone: 'America/New_York',
  },

  lead_image_url: {
    selectors: [['meta[name="og:image"]', 'value']],
  },

  content: {
    selectors: ['article', '.article-copy'],

    // Is there anything in the content you selected that needs transformed
    // before it's consumable content? E.g., unusual lazy loaded images
    transforms: {},

    // Is there anything that is in the result that shouldn't be?
    // The clean selectors will remove anything that matches from
    // the result
    clean: [],
  },
};
