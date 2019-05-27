export const OtrsComExtractor = {
  domain: 'otrs.com',

  title: {
    selectors: ['#main article h1'],
  },

  author: {
    selectors: ['div.dateplusauthor a'],
  },

  date_published: {
    selectors: [['meta[name="article:published_time"]', 'value']],
  },

  dek: {
    selectors: [['meta[name="og:description"]', 'value']],
  },

  lead_image_url: {
    selectors: [['meta[name="og:image"]', 'value']],
  },

  content: {
    selectors: ['#main article'],

    defaultCleaner: false,

    transforms: {},

    clean: [
      'div.dateplusauthor',
      'div.gr-12.push-6.footershare',
      '#atftbx',
      'div.category-modul',
    ],
  },
};
