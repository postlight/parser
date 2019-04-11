export const WwwMoongiftJpExtractor = {
  domain: 'www.moongift.jp',

  title: {
    selectors: ['h1.title a'],
  },

  author: null,

  date_published: {
    selectors: ['ul.meta li:not(.social):first-of-type'],
    timezone: 'Asia/Tokyo',
  },

  dek: {
    selectors: [['meta[name="og:description"]', 'value']],
  },

  lead_image_url: {
    selectors: [['meta[name="og:image"]', 'value']],
  },

  content: {
    selectors: ['#main'],

    transforms: {},

    clean: ['ul.mg_service.cf'],
  },
};
