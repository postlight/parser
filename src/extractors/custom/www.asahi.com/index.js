export const WwwAsahiComExtractor = {
  domain: 'www.asahi.com',

  title: {
    selectors: ['main h1', '.ArticleTitle h1'],
  },

  author: {
    selectors: [['meta[name="article:author"]', 'value']],
  },

  date_published: {
    selectors: [['meta[name="pubdate"]', 'value']],
  },

  dek: null,

  excerpt: {
    selectors: [['meta[name="og:description"]', 'value']],
  },

  lead_image_url: {
    selectors: [['meta[name="og:image"]', 'value']],
  },

  content: {
    selectors: ['main'],

    defaultCleaner: false,

    transforms: {},

    clean: ['div.AdMod', 'div.LoginSelectArea', 'time', 'div.notPrint'],
  },
};
