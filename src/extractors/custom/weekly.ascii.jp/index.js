export const WeeklyAsciiJpExtractor = {
  domain: 'weekly.ascii.jp',

  title: {
    selectors: ['h1[itemprop="headline"]'],
  },

  author: {
    selectors: ['p.author'],
  },

  date_published: {
    selectors: [['meta[name="odate"]', 'value']],
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
