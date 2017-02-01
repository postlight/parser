export const ScienceflyComExtractor = {
  domain: 'sciencefly.com',

  title: {
    selectors: [
      '.entry-title',
      '.cb-entry-title',
      '.cb-single-title',
    ],
  },

  author: {
    selectors: [
      'span.cb-title-fi div.cb-byline.cb-font-header div.cb-author.cb-byline-element',
    ],
  },

  date_published: {
    selectors: [
      ['meta[name="article:published_time"]', 'value'],
    ],
  },

  dek: {
    selectors: [
      // enter selectors
    ],
  },

  lead_image_url: {
    selectors: [
      ['div.theiaPostSlider_slides img', 'src'],
      ['meta[name="twitter:image"]', 'value'],
    ],
  },

  content: {
    selectors: [
      'div.theiaPostSlider_slides',
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
