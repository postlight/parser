export const WwwCbssportsComExtractor = {
  domain: 'www.cbssports.com',

  title: {
    selectors: [
      'h1.article-headline',
    ],
  },

  author: {
    selectors: [
      '.author-name',
    ],
  },

  date_published: {
    selectors: [
      '.date-published',
    ],
    timezone: 'America/New_York',
  },

  dek: {
    selectors: [
      'h2.article-subline',
    ],
  },

  lead_image_url: {
    selectors: [
      ['meta[name="og:image"]', 'value'],
    ],
  },

  content: {
    selectors: [
      'div.article',
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
