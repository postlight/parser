export const JvndbJvnJpExtractor = {
  domain: 'jvndb.jvn.jp',

  title: {
    selectors: ['title'],
  },

  author: null,

  date_published: {
    selectors: ['div.modifytxt:nth-child(2)'],
    format: 'YYYY/MM/DD',
    timezone: 'Asia/Tokyo',
  },

  dek: null,

  lead_image_url: null,

  content: {
    selectors: ['#news-list'],

    defaultCleaner: false,

    transforms: {},

    clean: [],
  },
};
