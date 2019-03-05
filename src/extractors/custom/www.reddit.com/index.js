export const WwwRedditComExtractor = {
  domain: 'www.reddit.com',

  title: {
    selectors: [['meta[name="og:title"]', 'value']],
  },

  author: {
    selectors: ['._2tbHP6ZydRpjI44J3syuqC.s1461iz-1.gWXVVu'],
  },

  date_published: {
    selectors: ['a[data-click-id="timestamp"]'],
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
