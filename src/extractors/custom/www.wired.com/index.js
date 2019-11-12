// Rename CustomExtractor
// to fit your publication
// (e.g., NYTimesExtractor)
export const WiredExtractor = {
  domain: 'www.wired.com',
  title: {
    selectors: [
      'h1.post-title',
      'h1.content-header__hed',
      // enter title selectors
    ],
  },

  author: {
    selectors: [
      'a[rel="author"]',
      'a.byline__name-link',
      // enter author selectors
    ],
  },

  content: {
    selectors: [
      '.body__container.article__body',
      'article.content',
      // enter content selectors
    ],

    // Is there anything in the content you selected that needs transformed
    // before it's consumable content? E.g., unusual lazy loaded images
    transforms: [],

    // Is there anything that is in the result that shouldn't be?
    // The clean selectors will remove anything that matches from
    // the result
    clean: [
      '.visually-hidden',
      'figcaption img.photo',
      '.callout--related-list',
      '.consumer-marketing-unit',
      '.add--in-content',
    ],
  },

  date_published: {
    selectors: [
      ['meta[itemprop="datePublished"]', 'value'],
      '.content-header__publish-date',
    ],
  },

  lead_image_url: {
    selectors: [
      ['meta[name="og:image"]', 'value'],
      ['meta[property="og:image"]', 'content'],
    ],
  },

  dek: {
    selectors: ['content-header__dek'],
  },

  next_page_url: null,

  excerpt: null,
};
