export const WwwBluesnewsComExtractor = {
  domain: 'www.bluesnews.com',

  title: {
    selectors: [['meta[name="Description"]', 'value']],
  },

  date_published: {
    selectors: ['.postdate'],
  },

  content: {
    defaultCleaner: false,
    selectors: [['.article']],

    // Is there anything in the content you selected that needs transformed
    // before it's consumable content? E.g., unusual lazy loaded images
    transforms: {},

    // Is there anything that is in the result that shouldn't be?
    // The clean selectors will remove anything that matches from
    // the result
    clean: [],
  },
};
