export const MoneyCnnComExtractor = {
  domain: 'money.cnn.com',

  title: {
    selectors: ['.article-title'],
  },

  author: {
    selectors: ['.byline a'],
  },

  date_published: {
    selectors: [['meta[name="date"]', 'value']],

    timezone: 'GMT',
  },

  dek: {
    selectors: ['#storytext h2'],
  },

  lead_image_url: {
    selectors: [['meta[name="og:image"]', 'value']],
  },

  content: {
    selectors: ['#storytext'],

    // Is there anything in the content you selected that needs transformed
    // before it's consumable content? E.g., unusual lazy loaded images
    transforms: {},

    // Is there anything that is in the result that shouldn't be?
    // The clean selectors will remove anything that matches from
    // the result
    clean: ['.inStoryHeading'],
  },
};
