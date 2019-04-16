export const WwwElecomCoJpExtractor = {
  domain: 'www.elecom.co.jp',

  title: {
    selectors: ['title'],
  },

  author: null,

  date_published: {
    selectors: ['p.section-last'],
    format: 'YYYY.MM.DD',
    timezone: 'Asia/Tokyo',
  },

  dek: null,

  lead_image_url: null,

  content: {
    selectors: ['td.TableMain2'],

    defaultCleaner: false,

    transforms: {
      table: $node => {
        $node.attr('width', 'auto');
      },
    },

    clean: [],
  },
};
