export const WwwFoolComExtractor = {
  domain: 'www.fool.com',

  title: {
    selectors: [
      'h1',
    ],
  },

  author: {
    selectors: [
      '.author-inline .author-name',
    ],
  },

  date_published: {
    selectors: [
      ['meta[name="date"]', 'value'],
    ],
  },

  dek: {
    selectors: [
      'header h2',
    ],
  },

  lead_image_url: {
    selectors: [
      ['meta[name="og:image"]', 'value'],
    ],
  },

  content: {
    selectors: [
      '.article-content',
    ],

    // Is there anything in the content you selected that needs transformed
    // before it's consumable content? E.g., unusual lazy loaded images
    transforms: {
      '.caption img': 'figure',
    },

    // Is there anything that is in the result that shouldn't be?
    // The clean selectors will remove anything that matches from
    // the result
    clean: [
      '.caption'
    ],
  },
};
