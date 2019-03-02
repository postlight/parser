export const WwwWashingtonpostComExtractor = {
  domain: 'www.washingtonpost.com',

  title: {
    selectors: ['h1', '#topper-headline-wrapper'],
  },

  author: {
    selectors: ['.pb-author-name'],
  },

  date_published: {
    selectors: [['.author-timestamp[itemprop="datePublished"]', 'content']],
  },

  dek: {
    selectors: [],
  },

  lead_image_url: {
    selectors: [['meta[name="og:image"]', 'value']],
  },

  content: {
    selectors: ['.article-body'],

    // Is there anything in the content you selected that needs transformed
    // before it's consumable content? E.g., unusual lazy loaded images
    transforms: {
      'div.inline-content': $node => {
        if ($node.has('img,iframe,video').length > 0) {
          return 'figure';
        }

        $node.remove();
        return null;
      },
      '.pb-caption': 'figcaption',
    },

    // Is there anything that is in the result that shouldn't be?
    // The clean selectors will remove anything that matches from
    // the result
    clean: ['.interstitial-link', '.newsletter-inline-unit'],
  },
};
