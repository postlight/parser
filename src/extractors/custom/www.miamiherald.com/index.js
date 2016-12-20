export const WwwMiamiheraldComExtractor = {
  domain: 'www.miamiherald.com',

  title: {
    selectors: [
      'h1.title',
    ],
  },

  author: {
    selectors: [
      '.ng_byline_name',
    ],
  },

  date_published: {
    selectors: [
      'p.published-date',
    ],
  },

  lead_image_url: {
    selectors: [
      ['meta[name="og:image"]', 'value'],
    ],
  },

  content: {
    selectors: [
      'div.dateline-storybody',
      'div#story-target',
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
