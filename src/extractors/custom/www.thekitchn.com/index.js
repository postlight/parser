export const WwwThekitchnComExtractor = {
  domain: 'www.thekitchn.com',

  title: {
    selectors: [
      'h1.PostHeader__headline.headline',
    ],
  },

  author: {
    selectors: [
      'span.PostByline__name.PostByline__name--with-portrait',
    ],
  },

  date_published: {
    selectors: [
      'div.PostByline__timestamp',
    ],
  },

  dek: null,

  lead_image_url: null,

  content: {
    selectors: [
      'div.typeset--longform',
    ],

    transforms: {
      noscript: ($node) => {
        const $children = $node.children();
        if ($children.length === 1 && $children.get(0).tagName === 'img') {
          return 'figure';
        }
        return null;
      },
    },

    clean: [
      'picture',
    ],
  },
};
