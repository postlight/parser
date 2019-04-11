export const PhpspotOrgExtractor = {
  domain: 'phpspot.org',

  title: {
    selectors: ['h3.hl'],
  },

  author: null,

  date_published: {
    selectors: ['h4.hl'],
    format: 'YYYY年MM月DD日',
    timezone: 'Asia/Tokyo',
  },

  dek: null,

  lead_image_url: null,

  content: {
    selectors: ['div.entrybody'],

    defaultCleaner: false,

    transforms: {},

    clean: [],
  },
};
