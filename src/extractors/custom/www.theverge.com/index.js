export const WwwThevergeComExtractor = {
  domain: 'www.theverge.com',

  supportedDomains: ['www.polygon.com'],

  title: {
    selectors: ['h1'],
  },

  author: {
    selectors: [['meta[name="author"]', 'value']],
  },

  date_published: {
    selectors: [['meta[name="article:published_time"]', 'value']],
  },

  dek: {
    selectors: ['h2.p-dek'],
  },

  lead_image_url: {
    selectors: [['meta[name="og:image"]', 'value']],
  },

  content: {
    selectors: [
      // feature template multi-match
      ['.c-entry-hero .e-image', '.c-entry-intro', '.c-entry-content'],
      // regular post multi-match
      ['.e-image--hero', '.c-entry-content'],
      // feature template fallback
      '.l-wrapper .l-feature',
      // regular post fallback
      'div.c-entry-content',
    ],

    // Transform lazy-loaded images
    transforms: {
      noscript: $node => {
        const $children = $node.children();
        if ($children.length === 1 && $children.get(0).tagName === 'img') {
          return 'span';
        }

        return null;
      },
    },

    // Is there anything that is in the result that shouldn't be?
    // The clean selectors will remove anything that matches from
    // the result
    clean: [
      '.aside',
      'img.c-dynamic-image', // images come from noscript transform
    ],
  },
};
