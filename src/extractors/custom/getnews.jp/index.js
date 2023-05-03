export const GetnewsJpExtractor = {
  domain: 'getnews.jp',

  title: {
    selectors: ['article h1'],
  },

  author: {
    selectors: [['meta[name="article:author"]', 'value'], 'span.prof'],
  },

  date_published: {
    selectors: [
      ['meta[name="article:published_time"]', 'value'],
      ['ul.cattag-top time', 'datetime'],
    ],
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
