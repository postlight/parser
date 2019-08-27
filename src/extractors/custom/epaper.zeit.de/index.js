export const EpaperZeitDeExtractor = {
  domain: 'epaper.zeit.de',

  title: {
    selectors: ['p.title'],
  },

  author: {
    selectors: ['.article__author'],
  },

  date_published: null,

  excerpt: {
    selectors: ['subtitle'],
  },

  lead_image_url: null,

  content: {
    selectors: ['.article'],

    // Is there anything in the content you selected that needs transformed
    // before it's consumable content? E.g., unusual lazy loaded images
    transforms: {
      'p.title': 'h1',
      '.article__author': 'p',
      byline: 'p',
      linkbox: 'p',
    },

    // Is there anything that is in the result that shouldn't be?
    // The clean selectors will remove anything that matches from
    // the result
    clean: ['image-credits', 'box[type=citation]'],
  },
};
