export const WeeklyAsciiJpExtractor = {
  domain: 'weekly.ascii.jp',

  title: {
    selectors: ['article h1', 'h1[itemprop="headline"]'],
  },

  author: {
    selectors: ['p.author'],
  },

  date_published: {
    selectors: ['p.date', ['meta[name="odate"]', 'value']],

    format: 'YYYY年MM月DD日 HH:mm',

    timezone: 'Asia/Tokyo',
  },

  dek: null,

  lead_image_url: {
    selectors: [['meta[name="og:image"]', 'value']],
  },

  content: {
    selectors: ['div#contents_detail', 'div.article'],

    transforms: {},

    clean: [],
  },
};
