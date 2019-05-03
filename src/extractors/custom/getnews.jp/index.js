export const GetnewsJpExtractor = {
  domain: 'getnews.jp',

  title: {
    selectors: ['article h1'],
  },

  author: {
    selectors: ['span.prof'],
  },

  date_published: {
    selectors: [['ul.cattag-top time', 'datetime']],
  },

  dek: null,

  lead_image_url: {
    selectors: [['meta[name="og:image"]', 'value']],
  },

  content: {
    selectors: ['div.post-bodycopy'],

    transforms: {},

    clean: [],
  },
};
