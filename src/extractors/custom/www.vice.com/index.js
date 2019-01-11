export const WwwViceComExtractor = {
  domain: 'www.vice.com',

  title: {
    selectors: [
      'h1',
      '.article__title',
    ],
  },

  author: {
    selectors: [
      ['meta[name="article:author"]', 'value'],
    ],
  },

  date_published: {
    selectors: [
      ['meta[name="datePublished"]', 'value'],
    ],
  },

  dek: {
    selectors: [
      '.article__dek',
    ],
  },

  lead_image_url: {
    selectors: [
      ['meta[name="og:image"]', 'value'],
    ],
  },

  content: {
    selectors: [
      '.article__body',
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
