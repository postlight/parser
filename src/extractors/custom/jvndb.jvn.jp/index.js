export const JvndbJvnJpExtractor = {
  domain: 'jvndb.jvn.jp',

  title: {
    selectors: ['title'],
  },

  author: null,

  date_published: null,

  dek: null,

  lead_image_url: null,

  content: {
    selectors: ['#news-list'],

    defaultCleaner: false,

    transforms: {},

    clean: [],
  },
};
