export const NitterSnopytaOrgExtractor = {
  domain: 'nitter.snopyta.org',

  title: {
    selectors: [['meta[name="og:title"]', 'value']],
  },

  content: {
    defaultCleaner: false,
    selectors: [['.container']],

    // Is there anything in the content you selected that needs transformed
    // before it's consumable content? E.g., unusual lazy loaded images
    transforms: {
      '.quote': 'blockquote',
      '.fullname-and-username .username': $node => {
        $node.after(':');
      },
    },

    // Is there anything that is in the result that shouldn't be?
    // The clean selectors will remove anything that matches from
    // the result
    clean: [
      '.replies',
      '.tweet-stats',
      '.tweet-avatar',
      '.tweet-published',
      '.tweet-date',
      '.icon-container',
    ],
  },
};
