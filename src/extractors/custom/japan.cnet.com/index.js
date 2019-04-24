export const JapanCnetComExtractor = {
  domain: 'japan.cnet.com',

  title: {
    selectors: ['.leaf-headline-ttl'],
  },

  author: {
    selectors: ['.writer'],
  },

  date_published: {
    selectors: ['.date'],
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
