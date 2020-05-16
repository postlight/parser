export const WwwThesalinepostComExtractor = {
  domain: 'www.thesalinepost.com',

  title: {
    selectors: [['meta[name="og:title"]', 'value']],
  },

  author: {
    selectors: ['.article-author .author-name'],
  },

  date_published: {
    selectors: [['meta[name="article:published_time"]', 'value']],
  },

  lead_image_url: {
    selectors: [['meta[name="og:image"]', 'value']],
  },

  content: {
    defaultCleaner: false,
    selectors: [['div[property="content:encoded"]']],
    transforms: {
      'div[property="content:encoded"]': ($node, $) => {
        const [
          selector,
          attr,
        ] = WwwThesalinepostComExtractor.lead_image_url.selectors[0];
        const src = $(selector).attr(attr);
        if (src) {
          $node.prepend(`<img src="${src}" />`);
        }
      },
    },
  },
};
