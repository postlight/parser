export const WwwSlateComExtractor = {
  domain: 'www.slate.com',

  title: {
    selectors: ['.hed', 'h1'],
  },

  author: {
    selectors: ['a[rel=author]'],
  },

  date_published: {
    selectors: ['.pub-date'],

    timezone: 'America/New_York',
  },

  dek: {
    selectors: ['.dek'],
  },

  lead_image_url: {
    selectors: [['meta[name="og:image"]', 'value']],
  },

  content: {
    selectors: ['.body'],

    // Is there anything in the content you selected that needs transformed
    // before it's consumable content? E.g., unusual lazy loaded images
    transforms: {},

    // Is there anything that is in the result that shouldn't be?
    // The clean selectors will remove anything that matches from
    // the result
    clean: [
      '.about-the-author',
      '.pullquote',
      '.newsletter-signup-component',
      '.top-comment',
    ],
  },
};
