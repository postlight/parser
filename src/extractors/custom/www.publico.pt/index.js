export const WwwPublicoPtExtractor = {
  domain: 'www.publico.pt',

  title: {
    selectors: [
      // enter title selectors
      '.story__headline',
    ],
  },

  author: {
    selectors: [
      // enter author selectors
      '.byline__name',
    ],
  },

  date_published: {
    selectors: [
      // enter selectors
      '.dateline',
    ],
    timezone: 'Europe/Lisbon',
  },

  dek: {
    selectors: [
      // enter selectors
      '.lead',
    ],
  },

  lead_image_url: {
    selectors: [['meta[name="og:image"]', 'value']],
  },

  content: {
    selectors: [
      // enter content selectors
      '.story__body',
    ],

    // Is there anything in the content you selected that needs transformed
    // before it's consumable content? E.g., unusual lazy loaded images
    transforms: {},

    // Is there anything that is in the result that shouldn't be?
    // The clean selectors will remove anything that matches from
    // the result
    clean: ['#newsletters_inline', '.ad-slot', '.story__callout'],
  },
};
