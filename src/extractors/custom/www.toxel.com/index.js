export const WwwToxelComExtractor = {
  domain: 'www.toxel.com',

  title: {
    selectors: ['title'],
  },

  date_published: {
    selectors: ['.postinfo'],
  },

  lead_image_url: {
    selectors: [['link[rel="image_src"]', 'href']],
  },

  content: {
    selectors: ['.main'],

    // Is there anything in the content you selected that needs transformed
    // before it's consumable content? E.g., unusual lazy loaded images
    transforms: {},

    // Is there anything that is in the result that shouldn't be?
    // The clean selectors will remove anything that matches from
    // the result
    clean: [],
  },
};
