export const WwwBloombergComExtractor = {
  domain: 'www.bloomberg.com',

  title: {
    selectors: [
      // normal articles
      '.lede-headline',

      // /graphics/ template
      'h1.article-title',

      // /news/ template
      'h1.lede-text-only__hed',
    ],
  },

  author: {
    selectors: [
      ['meta[name="parsely-author"]', 'value'],
      '.byline-details__link',

      // /graphics/ template
      '.bydek',

      // /news/ template
      '.author',
    ],
  },

  date_published: {
    selectors: [
      ['time.published-at', 'datetime'],
      ['time[datetime]', 'datetime'],
      ['meta[name="date"]', 'value'],
      ['meta[name="parsely-pub-date"]', 'value'],
    ],
  },

  dek: {
    selectors: [],
  },

  lead_image_url: {
    selectors: [['meta[name="og:image"]', 'value']],
  },

  content: {
    selectors: [
      '.article-body__content',

      // /graphics/ template
      ['section.copy-block'],

      // /news/ template
      '.body-copy',
    ],

    // Is there anything in the content you selected that needs transformed
    // before it's consumable content? E.g., unusual lazy loaded images
    transforms: {},

    // Is there anything that is in the result that shouldn't be?
    // The clean selectors will remove anything that matches from
    // the result
    clean: ['.inline-newsletter', '.page-ad'],
  },
};
