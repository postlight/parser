export const WwwRbbtodayComExtractor = {
  domain: 'www.rbbtoday.com',

  title: {
    selectors: ['h1'],
  },

  author: {
    selectors: ['.writer.writer-name'],
  },

  date_published: {
    selectors: [['header time', 'datetime']],
  },

  dek: {
    selectors: ['.arti-summary'],
  },

  lead_image_url: {
    selectors: [['meta[name="og:image"]', 'value']],
  },

  content: {
    selectors: ['.arti-content'],

    transforms: {},

    clean: ['.arti-giga'],
  },
};
