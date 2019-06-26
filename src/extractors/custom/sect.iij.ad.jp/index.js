export const SectIijAdJpExtractor = {
  domain: 'sect.iij.ad.jp',

  title: {
    selectors: ['h3'],
  },

  author: {
    selectors: ['dl.entrydate dd'],
  },

  date_published: {
    selectors: ['dl.entrydate dd'],
    format: 'YYYY年MM月DD日',
    timezone: 'Asia/Tokyo',
  },

  dek: null,

  lead_image_url: {
    selectors: [['meta[name="og:image"]', 'value']],
  },

  content: {
    selectors: ['#article'],

    transforms: {},

    clean: ['dl.entrydate'],
  },
};
