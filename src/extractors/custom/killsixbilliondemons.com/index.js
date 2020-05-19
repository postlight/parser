export const KillsixbilliondemonsComExtractor = {
  domain: 'killsixbilliondemons.com',

  title: {
    selectors: ['h1'],
  },

  author: {
    selectors: ['.post-author a'],
  },

  lead_image_url: {
    selectors: [['meta[name="og:image"]', 'value']],
  },

  content: {
    selectors: [['#comic']],

    // Is there anything in the content you selected that needs transformed
    // before it's consumable content? E.g., unusual lazy loaded images
    transforms: {},

    // Is there anything that is in the result that shouldn't be?
    // The clean selectors will remove anything that matches from
    // the result
    clean: [],
  },
};
