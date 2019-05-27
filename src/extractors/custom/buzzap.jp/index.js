export const BuzzapJpExtractor = {
  domain: 'buzzap.jp',

  title: {
    selectors: ['h1.entry-title'],
  },

  author: null,

  date_published: {
    selectors: [['time.entry-date', 'datetime']],
  },

  dek: null,

  lead_image_url: {
    selectors: [['meta[name="og:image"]', 'value']],
  },

  content: {
    selectors: ['div.ctiframe'],

    defaultCleaner: false,

    transforms: {},

    clean: [],
  },
};
