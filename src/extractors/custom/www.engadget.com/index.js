export const WwwEngadgetComExtractor = {
  domain: 'www.engadget.com',

  title: {
    selectors: [['meta[name="og:title"]', 'value']],
  },

  author: {
    selectors: ['a.th-meta[data-ylk*="subsec:author"]'],
  },

  // Engadget stories have publish dates, but the only representation of them on the page
  // is in a format like "2h ago". There are also these tags with blank values:
  // <meta class="swiftype" name="published_at" data-type="date" value="">
  date_published: {
    selectors: [
      // enter selectors
    ],
  },

  dek: {
    selectors: ['div[class*="o-title_mark"] div'],
  },

  // Engadget stories do have lead images specified by an og:image meta tag, but selecting
  // the value attribute of that tag fails. I believe the "&#x2111;" sequence of characters
  // is triggering this inability to select the attribute value.
  lead_image_url: {
    selectors: [
      // enter selectors
    ],
  },

  content: {
    selectors: [
      [
        // Some figures will be inside div.article-text, but some header figures/images
        // will not.
        '#page_body figure:not(div.article-text figure)',
        'div.article-text',
      ],
    ],

    // Is there anything in the content you selected that needs transformed
    // before it's consumable content? E.g., unusual lazy loaded images
    transforms: {},

    // Is there anything that is in the result that shouldn't be?
    // The clean selectors will remove anything that matches from
    // the result
    clean: [],
  },
};
