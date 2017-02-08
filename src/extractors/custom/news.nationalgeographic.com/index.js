export const NewsNationalgeographicComExtractor = {
  domain: 'news.nationalgeographic.com',

  title: {
    selectors: [
      'h1.main-title',
    ],
  },

  author: {
    selectors: [
      '.byline-component__contributors b span',
    ],
  },

  date_published: {
    selectors: [
       ['meta[name="article:published_time"]', 'value'],
    ],
    format: 'ddd MMM DD HH:mm:ss zz YYYY',
    timezone: 'EST',
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
      'div.pull-quote.pull-quote--large',
    ],
  },
};
