export const BiorxivOrgExtractor = {
  domain: 'biorxiv.org',

  title: {
    selectors: ['h1#page-title'],
  },

  author: {
    selectors: [
      'div.highwire-citation-biorxiv-article-top > div.highwire-cite-authors',
    ],
  },

  content: {
    selectors: ['div#abstract-1'],

    // Is there anything in the content you selected that needs transformed
    // before it's consumable content? E.g., unusual lazy loaded images
    transforms: {},

    // Is there anything that is in the result that shouldn't be?
    // The clean selectors will remove anything that matches from
    // the result
    clean: [],
  },
};
