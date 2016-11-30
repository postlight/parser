export const WwwCnnComExtractor = {
  domain: 'www.cnn.com',

  defaultCleaner: false,

  title: {
    selectors: [
      'h1.pg-headline',
      'h1',
    ],
  },

  author: {
    selectors: [
      '.metadata__byline__author',
    ],
  },

  date_published: {
    selectors: [
      // ['meta[name="lastmod"]', 'value'], Do we want last modifed or published?
      ['meta[name="pubdate"]', 'value'],
    ],
  },

  dek: null,

  lead_image_url: {
    selectors: [
      ['meta[name="og:image"]', 'value'],
    ],
  },

  content: {
    selectors: [
      'div[itemprop="articleBody"]',
    ],

    // Is there anything in the content you selected that needs transformed
    // before it's consumable content? E.g., unusual lazy loaded images
    transforms: {
      '.zn-body__paragraph': ($node) => {
        const $text = $node.html();
        if ($text) {
          return 'p';
        }

        return null;
      },
    },

    // Is there anything that is in the result that shouldn't be?
    // The clean selectors will remove anything that matches from
    // the result
    clean: [
    ],
  },
};
