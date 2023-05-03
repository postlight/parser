export const PoliticoExtractor = {
  domain: 'www.politico.com',
  title: {
    selectors: [['meta[name="og:title"]', 'value']],
  },

  author: {
    selectors: [
      ['div[itemprop="author"] meta[itemprop="name"]', 'value'],
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
      ['time[itemprop="datePublished"]', 'datetime'],
      ['.story-meta__details time[datetime]', 'datetime'],
      ['.story-main-content .timestamp time[datetime]', 'datetime'],
    ],
    timezone: 'America/New_York',
  },

  lead_image_url: {
    selectors: [['meta[name="og:image"]', 'value']],
  },

  dek: {
    selectors: [['meta[name="og:description"]', 'value']],
  },
};
