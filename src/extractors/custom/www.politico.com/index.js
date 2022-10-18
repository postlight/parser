export const PoliticoExtractor = {
  domain: 'www.politico.com',
  title: {
    selectors: [['meta[name="og:title"]', 'value']],
  },

  author: {
    selectors: [
      '.story-meta__authors .vcard',
      '.story-main-content .byline .vcard',
    ],
  },

  content: {
    selectors: [['.story-text'], '.story-main-content', '.story-core'],

    transforms: [],

    clean: ['figcaption', '.story-meta', '.ad'],
  },

  date_published: {
    selectors: [
      ['.story-meta__details time[datetime]', 'datetime'],
      ['.story-main-content .timestamp time[datetime]', 'datetime'],
    ],
  },

  lead_image_url: {
    selectors: [['meta[name="og:image"]', 'value']],
  },

  dek: {
    selectors: [['meta[name="og:description"]', 'value']],
  },

  next_page_url: null,

  excerpt: null,
};
