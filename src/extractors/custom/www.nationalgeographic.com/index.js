export const WwwNationalgeographicComExtractor = {
  domain: 'www.nationalgeographic.com',

  title: {
    selectors: [
      'h1.main-title',
    ],
  },

  author: {
    selectors: [
      'span.byline-component__contributors',
    ],
  },

  date_published: {
    selectors: [
      ['meta[name="article:published_time"]', 'value'],
    ],
  },

  dek: {
    selectors: [
      'div.article__deck',
    ],
  },

  lead_image_url: {
    selectors: [
      ['meta[name="og:image"]', 'value'],
    ],
  },

  content: {
    selectors: [
      '.parsys',
      '.content',
    ],

    // Is there anything in the content you selected that needs transformed
    // before it's consumable content? E.g., unusual lazy loaded images
    transforms: {
    },

    // Is there anything that is in the result that shouldn't be?
    // The clean selectors will remove anything that matches from
    // the result
    clean: [
      '.pull-quote.pull-quote--small',
    ],
  },
};
