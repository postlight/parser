export const WwwRbbtodayComExtractor = {
  domain: 'www.rbbtoday.com',

  title: {
    selectors: ['h1'],
  },

  author: {
    selectors: ['.writer.writer-name'],
  },

  date_published: {
    selectors: [['header time', 'datetime']],
  },

  dek: null,

  lead_image_url: {
    selectors: [['meta[name="og:image"]', 'value']],
  },

  content: {
    selectors: ['.arti-content'],

    transforms: {
      '.giga-list': $node => {
        const innerHtml = $node.html();
        $node.replaceWith(innerHtml);
      },
    },

    clean: [],
  },
};
