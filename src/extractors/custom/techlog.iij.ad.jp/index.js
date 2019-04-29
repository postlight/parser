export const TechlogIijAdJpExtractor = {
  domain: 'techlog.iij.ad.jp',

  title: {
    selectors: ['h1.entry-title'],
  },

  author: {
    selectors: ['a[rel="author"]'],
  },

  date_published: {
    selectors: [['time', 'datetime']],
  },

  dek: null,

  lead_image_url: {
    selectors: [['meta[name="og:image"]', 'value']],
  },

  content: {
    selectors: ['div.entry-content.clearfix'],

    defaultCleaner: false,

    transforms: {},

    clean: [],
  },
};
