export const JapanZdnetComExtractor = {
  domain: 'japan.zdnet.com',

  title: {
    selectors: ['h1'],
  },

  author: {
    selectors: [['meta[name="cXenseParse:author"]', 'value']],
  },

  date_published: {
    selectors: [['meta[name="article:published_time"]', 'value']],
  },

  dek: null,

  lead_image_url: {
    selectors: [['meta[name="og:image"]', 'value']],
  },

  content: {
    selectors: ['div.article_body'],

    transforms: {},

    clean: [],
  },
};
