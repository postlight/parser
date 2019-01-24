export const WwwNjComExtractor = {
  domain: 'www.nj.com',

  title: {
    selectors: [['meta[name="title"]', 'value']],
  },

  author: {
    selectors: [['meta[name="article_author"]', 'value']],
  },

  date_published: {
    selectors: [['meta[name="article_date_original"]', 'value']],

    timezone: 'America/New_York',
  },

  lead_image_url: {
    selectors: [['meta[name="og:image"]', 'value']],
  },

  content: {
    selectors: ['.entry-content'],

    // Is there anything in the content you selected that needs transformed
    // before it's consumable content? E.g., unusual lazy loaded images
    transforms: {},

    // Is there anything that is in the result that shouldn't be?
    // The clean selectors will remove anything that matches from
    // the result
    clean: [],
  },
};
