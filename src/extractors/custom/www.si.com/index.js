export const WwwSiComExtractor = {
  domain: 'www.si.com',

  title: {
    selectors: ['h1', 'h1.headline'],
  },

  author: {
    selectors: [['meta[name="author"]', 'value']],
  },

  date_published: {
    selectors: ['.timestamp'],

    timezone: 'America/New_York',
  },

  dek: {
    selectors: ['.quick-hit ul'],
  },

  lead_image_url: {
    selectors: [['meta[name="og:image"]', 'value']],
  },

  content: {
    selectors: [['p', '.marquee_large_2x', '.component.image']],

    // Is there anything in the content you selected that needs transformed
    // before it's consumable content? E.g., unusual lazy loaded images
    transforms: {
      noscript: $node => {
        const $children = $node.children();
        if ($children.length === 1 && $children.get(0).tagName === 'img') {
          return 'figure';
        }

        return null;
      },
    },

    // Is there anything that is in the result that shouldn't be?
    // The clean selectors will remove anything that matches from
    // the result
    clean: [
      ['.inline-thumb', '.primary-message', '.description', '.instructions'],
    ],
  },
};
