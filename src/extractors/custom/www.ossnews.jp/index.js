export const WwwOssnewsJpExtractor = {
  domain: 'www.ossnews.jp',

  title: {
    selectors: ['#alpha-block h1.hxnewstitle'],
  },

  author: null,

  date_published: null,

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
