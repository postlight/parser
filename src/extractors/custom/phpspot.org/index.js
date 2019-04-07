export const PhpspotOrgExtractor = {
  domain: 'phpspot.org',

  title: {
    selectors: ['h3.hl'],
  },

  author: null,

  date_published: null,

  dek: null,

  lead_image_url: null,

  content: {
    selectors: ['div.entrybody'],

    defaultCleaner: false,

    transforms: {},

    clean: [],
  },
};
