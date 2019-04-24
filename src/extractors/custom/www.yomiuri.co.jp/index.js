export const WwwYomiuriCoJpExtractor = {
  domain: 'www.yomiuri.co.jp',

  title: {
    selectors: ['h1.title-article.c-article-title'],
  },

  author: null,

  date_published: {
    selectors: [['meta[name="article:published_time"]', 'value']],
  },

  dek: null,

  lead_image_url: {
    selectors: [['meta[name="og:image"]', 'value']],
  },

  content: {
    selectors: ['div.p-main-contents'],

    transforms: {},

    clean: [],
  },
};
