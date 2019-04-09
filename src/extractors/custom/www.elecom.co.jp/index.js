export const WwwElecomCoJpExtractor = {
  domain: 'www.elecom.co.jp',

  title: {
    selectors: ['title'],
  },

  author: null,

  date_published: null,

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
