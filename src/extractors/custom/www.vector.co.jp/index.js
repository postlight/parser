export const WwwVectorCoJpExtractor = {
  domain: 'www.vector.co.jp',

  title: {
    selectors: ['#v_wrapper table td[valign="middle"] font[size="+3"] strong'],
  },

  author: null,

  date_published: {
    selectors: ['#v_wrapper table td[align=right] font'],
    timezone: 'Asia/Tokyo',
  },

  dek: {
    selectors: ['#v_wrapper table td[valign="middle"] font[size="+1"]'],
  },

  lead_image_url: {
    selectors: [['meta[name="og:image"]', 'value']],
  },

  content: {
    selectors: [
      '#v_wrapper table[align="center"] td[valign="top"][align="left"]',
    ],

    defaultCleaner: false,

    transforms: {},

    clean: [],
  },
};
