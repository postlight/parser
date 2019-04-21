export const WeeklyAsciiJpExtractor = {
  domain: 'weekly.ascii.jp',

  title: {
    selectors: ['h1[itemprop]'],
  },

  author: {
    selectors: ['p.author'],
  },

  date_published: {
    selectors: ['p.data'],
    format: 'YYYY年MM月DD日HH時mm分',
    timezone: 'Asia/Tokyo',
  },

  dek: null,

  lead_image_url: {
    selectors: [['meta[name="og:image"]', 'value']],
  },

  content: {
    selectors: ['div.article'],

    transforms: {},

    clean: [],
  },
};
