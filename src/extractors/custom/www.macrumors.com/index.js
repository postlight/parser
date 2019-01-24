export const WwwMacrumorsComExtractor = {
  domain: 'www.macrumors.com',

  title: {
    selectors: ['h1', 'h1.title'],
  },

  author: {
    selectors: ['.author-url'],
  },

  date_published: {
    selectors: ['.article .byline'],

    // Wednesday January 18, 2017 11:44 am PST
    format: 'dddd MMMM D, YYYY h:mm A zz',

    timezone: 'America/Los_Angeles',
  },

  dek: {
    selectors: [['meta[name="description"]', 'value']],
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
