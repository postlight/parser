// Rename CustomExtractor
// to fit your publication
export const TheAtlanticExtractor = {
  domain: 'www.theatlantic.com',
  title: {
    selectors: ['h1', '.c-article-header__hed'],
  },

  author: {
    selectors: [['meta[name="author"]', 'value'], '.c-byline__author'],
  },

  content: {
    selectors: ['article', '.article-body'],

    // Is there anything in the content you selected that needs transformed
    // before it's consumable content? E.g., unusual lazy loaded images
    transforms: [],

    // Is there anything that is in the result that shouldn't be?
    // The clean selectors will remove anything that matches from
    // the result
    clean: [
      '.partner-box',
      '.callout',
      '.c-article-writer__image',
      '.c-article-writer__content',
      '.c-letters-cta__text',
      '.c-footer__logo',
      '.c-recirculation-link',
      '.twitter-tweet',
    ],
  },

  dek: {
    selectors: [['meta[name="description"]', 'value']],
  },

  date_published: {
    selectors: [['time[itemprop="datePublished"]', 'datetime']],
  },

  lead_image_url: {
    selectors: [['img[itemprop="url"]', 'src']],
  },

  next_page_url: null,

  excerpt: null,
};
