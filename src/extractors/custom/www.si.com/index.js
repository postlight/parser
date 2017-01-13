export const WwwSiComExtractor = {
  domain: 'www.si.com',

  title: {
    selectors: [
      'h1.headline',
    ],
  },

  author: {
    selectors: [
      ['meta[name="author"]', 'value'],
    ],
  },

  date_published: {
    selectors: [
      'div.timestamp',
    ],
  },

  dek: {
    selectors: [
      'div.quick-hit ul li',
    ],
  },

  lead_image_url: {
    selectors: [
      ['meta[name="og:image"]', 'value'],
    ],
  },

  content: {
    selectors: [
      'div.article.content.body.padded',
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
