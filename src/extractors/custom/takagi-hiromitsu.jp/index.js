export const TakagihiromitsuJpExtractor = {
  domain: 'takagi-hiromitsu.jp',

  title: {
    selectors: ['h3'],
  },

  author: {
    selectors: [['meta[name="author"]', 'value']],
  },

  date_published: {
    selectors: [['meta[http-equiv="Last-Modified"]', 'value']],
  },

  dek: null,

  lead_image_url: null,

  content: {
    selectors: ['div.body'],

    defaultCleaner: false,

    transforms: {},

    clean: [],
  },
};
