export const WwwOreillyCoJpExtractor = {
  domain: 'www.oreilly.co.jp',

  title: {
    selectors: ['h3'],
  },

  author: {
    selectors: ['li[itemprop="author"]'],
  },

  date_published: {
    selectors: [['meta[itemprop="datePublished"]', 'value']],
    timezone: 'Asia/Tokyo',
  },

  dek: null,

  lead_image_url: {
    selectors: [['meta[name="og:image"]', 'value']],
  },

  content: {
    selectors: ['#content'],

    defaultCleaner: false,

    transforms: {},

    clean: ['.social-tools'],
  },
};
