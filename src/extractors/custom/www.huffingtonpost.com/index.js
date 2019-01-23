export const WwwHuffingtonpostComExtractor = {
  domain: 'www.huffingtonpost.com',

  title: {
    selectors: ['h1.headline__title'],
  },

  author: {
    selectors: ['span.author-card__details__name'],
  },

  date_published: {
    selectors: [
      ['meta[name="article:modified_time"]', 'value'],
      ['meta[name="article:published_time"]', 'value'],
    ],
  },

  dek: {
    selectors: ['h2.headline__subtitle'],
  },

  lead_image_url: {
    selectors: [['meta[name="og:image"]', 'value']],
  },

  content: {
    selectors: ['div.entry__body'],

    defaultCleaner: false,

    // Is there anything in the content you selected that needs transformed
    // before it's consumable content? E.g., unusual lazy loaded images
    transforms: {},

    // Is there anything that is in the result that shouldn't be?
    // The clean selectors will remove anything that matches from
    // the result
    clean: [
      '.pull-quote',
      '.tag-cloud',
      '.embed-asset',
      '.below-entry',
      '.entry-corrections',
      '#suggested-story',
    ],
  },
};
