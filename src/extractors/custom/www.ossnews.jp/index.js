export const WwwOssnewsJpExtractor = {
  domain: 'www.ossnews.jp',

  title: {
    selectors: ['#alpha-block h1.hxnewstitle'],
  },

  author: null,

  date_published: {
    selectors: ['p.fs12'],
    format: 'YYYY[年]M[月]D[日] HH:mm',
    timezone: 'Asia/Tokyo',
  },

  dek: null,

  lead_image_url: {
    selectors: [['meta[name="og:image"]', 'value']],
  },

  content: {
    selectors: ['#alpha-block .section:has(h1.hxnewstitle)'],

    defaultCleaner: false,

    transforms: {},

    clean: [],
  },
};
