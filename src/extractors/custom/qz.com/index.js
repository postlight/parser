export const QzComExtractor = {
  domain: 'qz.com',

  title: {
    selectors: [
      'header.item-header.content-width-responsive',
    ],
  },

  author: {
    selectors: [
      ['meta[name="author"]', 'value'],
    ],
  },

  date_published: {
    selectors: [
      '.timestamp',
    ],
  },

  lead_image_url: {
    selectors: [
      ['meta[name="og:image"]', 'value'],
    ],
  },

  content: {
    selectors: [
      'div.item-body',
    ],

    // Is there anything in the content you selected that needs transformed
    // before it's consumable content? E.g., unusual lazy loaded images
    transforms: {
    },

    // Is there anything that is in the result that shouldn't be?
    // The clean selectors will remove anything that matches from
    // the result
    clean: [
      'div.article-aside',
    ],
  },
};
