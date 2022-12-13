export const WwwUsmagazineComExtractor = {
  domain: 'www.usmagazine.com',

  title: {
    selectors: ['header h1'],
  },

  author: {
    selectors: ['a.author', 'a.article-byline.tracked-offpage'],
  },

  date_published: {
    timezone: 'America/New_York',

    selectors: [['meta[name="article:published_time"]', 'value']],
  },

  lead_image_url: {
    selectors: [['meta[name="og:image"]', 'value']],
  },

  content: {
    selectors: ['div.article-content'],

    // Is there anything in the content you selected that needs transformed
    // before it's consumable content? E.g., unusual lazy loaded images
    transforms: {},

    // Is there anything that is in the result that shouldn't be?
    // The clean selectors will remove anything that matches from
    // the result
    clean: ['.module-related'],
  },
};
