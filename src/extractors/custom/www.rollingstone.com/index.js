export const WwwRollingstoneComExtractor = {
  domain: 'www.rollingstone.com',

  title: {
    selectors: ['h1.content-title'],
  },

  author: {
    selectors: ['a.content-author.tracked-offpage'],
  },

  date_published: {
    selectors: ['time.content-published-date'],

    timezone: 'America/New_York',
  },

  dek: {
    selectors: ['.content-description'],
  },

  lead_image_url: {
    selectors: [['meta[name="og:image"]', 'value']],
  },

  content: {
    selectors: [['.lead-container', '.article-content'], '.article-content'],

    // Is there anything in the content you selected that needs transformed
    // before it's consumable content? E.g., unusual lazy loaded images
    transforms: {},

    // Is there anything that is in the result that shouldn't be?
    // The clean selectors will remove anything that matches from
    // the result
    clean: ['.module-related'],
  },
};
