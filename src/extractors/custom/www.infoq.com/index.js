export const WwwInfoqComExtractor = {
  domain: 'www.infoq.com',

  title: {
    selectors: ['h1.heading'],
  },

  author: {
    selectors: ['div.widget.article__authors'],
  },

  date_published: {
    selectors: ['.article__readTime.date'],
    format: 'YYYY[年]M[月]D[日]',
    timezone: 'Asia/Tokyo',
  },

  dek: {
    selectors: [['meta[name="og:description"]', 'value']],
  },

  lead_image_url: {
    selectors: [['meta[name="og:image"]', 'value']],
  },

  content: {
    selectors: ['div.article__data'],

    defaultCleaner: false,

    transforms: {},

    clean: [],
  },
};
