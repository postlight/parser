export const WwwRedditComExtractor = {
  domain: 'www.reddit.com',

  title: {
    selectors: ['div[data-test-id="post-content"] h2'],
  },

  author: {
    selectors: ['div[data-test-id="post-content"] a[href*="user/"]'],
  },

  date_published: {
    selectors: [
      'div[data-test-id="post-content"] a[data-click-id="timestamp"]',
    ],
  },

  lead_image_url: {
    selectors: [['meta[name="og:image"]', 'value']],
  },

  content: {
    selectors: ['div[data-test-id="post-content"]'],

    // Is there anything in the content you selected that needs transformed
    // before it's consumable content? E.g., unusual lazy loaded images
    transforms: {},

    // Is there anything that is in the result that shouldn't be?
    // The clean selectors will remove anything that matches from
    // the result
    clean: [
      '._23h0-EcaBUorIHC-JZyh6J',
      '.ak6zgf-0',
      '.s5mir6g-0',
      '._1hwEKkB_38tIoal6fcdrt9',
    ],
  },
};
