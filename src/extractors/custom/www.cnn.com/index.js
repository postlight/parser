export const WwwCnnComExtractor = {
  domain: 'www.cnn.com',

  title: {
    selectors: ['h1.pg-headline', 'h1'],
  },

  author: {
    selectors: ['.metadata__byline__author'],
  },

  date_published: {
    selectors: [['meta[name="pubdate"]', 'value']],
  },

  lead_image_url: {
    selectors: [['meta[name="og:image"]', 'value']],
  },

  content: {
    selectors: [
      // a more specific selector to grab the lead image and the body
      ['.media__video--thumbnail', '.zn-body-text'],
      // a fallback for the above
      '.zn-body-text',
      'div[itemprop="articleBody"]',
    ],

    // Is there anything in the content you selected that needs transformed
    // before it's consumable content? E.g., unusual lazy loaded images
    transforms: {
      '.zn-body__paragraph, .el__leafmedia--sourced-paragraph': $node => {
        const $text = $node.html();
        if ($text) {
          return 'p';
        }

        return null;
      },

      // this transform cleans the short, all-link sections linking
      // to related content but not marked as such in any way.
      '.zn-body__paragraph': $node => {
        if ($node.has('a')) {
          if (
            $node.text().trim() ===
            $node
              .find('a')
              .text()
              .trim()
          ) {
            $node.remove();
          }
        }
      },

      '.media__video--thumbnail': 'figure',
    },

    // Is there anything that is in the result that shouldn't be?
    // The clean selectors will remove anything that matches from
    // the result
    clean: [],
  },
};
