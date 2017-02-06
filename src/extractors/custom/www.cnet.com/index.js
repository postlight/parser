export const WwwCnetComExtractor = {
  domain: 'www.cnet.com',

  title: {
    selectors: [
      ['meta[name="og:title"]', 'value'],
    ],
  },

  author: {
    selectors: [
      'a.author',
    ],
  },

  date_published: {
    selectors: [
      'time',
    ],

    timezone: 'America/Los_Angeles',
  },

  dek: {
    selectors: [
      '.article-dek',
    ],
  },

  lead_image_url: {
    selectors: [
      ['meta[name="og:image"]', 'value'],
    ],
  },

  content: {
    selectors: [
      '.article-main-body',
    ],

    // Is there anything in the content you selected that needs transformed
    // before it's consumable content? E.g., unusual lazy loaded images
    transforms: {
    },

    // Is there anything that is in the result that shouldn't be?
    // The clean selectors will remove anything that matches from
    // the result
    clean: [

    ],
  },
};
