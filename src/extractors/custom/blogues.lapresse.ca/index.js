export const BloguesLapresseCaExtractor = {
  domain: 'blogues.lapresse.ca',

  title: {
    selectors: [
      '.blogue-header h1',
    ],
  },

  author: {
    selectors: [
      '.blogue-center-box.first .widgettitle',
    ],
  },

  date_published: {
    selectors: [
      '.blogue-header',
    ],
  },

  dek: {
    selectors: [
      null,
    ],
  },

  lead_image_url: {
    selectors: [
      ['meta[name="og:image"]', 'value'],
    ],
  },

  content: {
    selectors: [
      '.entry',
    ],

    // Is there anything in the content you selected that needs transformed
    // before it's consumable content? E.g., unusual lazy loaded images
    transforms: {
    },

    // Is there anything that is in the result that shouldn't be?
    // The clean selectors will remove anything that matches from
    // the result
    clean: [

    ],
  },
};
