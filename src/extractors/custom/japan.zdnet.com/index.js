export const JapanZdnetComExtractor = {
  domain: 'japan.zdnet.com',

  title: {
    selectors: ['h1'],
  },

  author: {
    selectors: ['.author'],
  },

  date_published: {
    selectors: ['.author'],
    format: 'YYYY年MM月DD日 HH時mm分',
    timezone: 'Asia/Tokyo',
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
