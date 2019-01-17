export const WwwDmagazineComExtractor = {
  domain: 'www.dmagazine.com',

  title: {
    selectors: ['h1.story__title'],
  },

  author: {
    selectors: ['.story__info .story__info__item:first-child'],
  },

  date_published: {
    selectors: [
      // enter selectors
      '.story__info',
    ],

    timezone: 'America/Chicago',
  },

  dek: {
    selectors: ['.story__subhead'],
  },

  lead_image_url: {
    selectors: [['article figure a:first-child', 'href']],
  },

  content: {
    selectors: ['.story__content'],

    // Is there anything in the content you selected that needs transformed
    // before it's consumable content? E.g., unusual lazy loaded images
    transforms: {},

    // Is there anything that is in the result that shouldn't be?
    // The clean selectors will remove anything that matches from
    // the result
    clean: [],
  },
};
