export const WwwOreillyCoJpExtractor = {
  domain: 'www.oreilly.co.jp',

  title: {
    selectors: [['meta[name="og:title"]', 'value'], 'h3'],
  },

  author: {
    selectors: ['span[itemprop="author"]', 'li[itemprop="author"]'],
  },

  date_published: {
    selectors: [
      ['dd[itemprop="datePublished"]', 'content'],
      ['meta[itemprop="datePublished"]', 'value'],
    ],
    timezone: 'Asia/Tokyo',
  },

  dek: null,

  lead_image_url: {
    selectors: [
      ['meta[name="og:image:secure_url"]', 'value'],
      ['meta[name="og:image"]', 'value'],
    ],
  },

  content: {
    selectors: ['section.detail', '#content'],

    defaultCleaner: false,

    transforms: {},

    clean: ['.social-tools'],
  },
};
