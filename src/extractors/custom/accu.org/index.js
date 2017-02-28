export const AccuOrgExtractor = {
  domain: 'accu.org',

  title: {
    selectors: [
      'h1',
    ],
  },

  author: {
    selectors: [
      'div.journal-sub a',
    ],
  },

  date_published: {
    selectors: [
      // enter selectors
    ],
  },

  dek: {
    selectors: [
      // '.article-content div:first-child',
    ],
  },

  lead_image_url: {
    selectors: [
      // enter selectors
    ],
  },

  content: {
    selectors: [
      '.article-content',
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
