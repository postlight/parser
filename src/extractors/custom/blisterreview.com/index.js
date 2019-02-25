export const BlisterreviewComExtractor = {
  domain: 'blisterreview.com',

  title: {
    selectors: [['meta[name="og:title"]', 'value'], 'h1.entry-title'],
  },

  author: {
    selectors: ['span.author-name'],
  },

  date_published: {
    selectors: [
      ['meta[name="article:published_time"]', 'value'],
      ['time.entry-date', 'datetime'],
      ['meta[itemprop="datePublished"]', 'content'],
    ],
  },

  dek: {
    selectors: [
      // enter selectors
    ],
  },

  lead_image_url: {
    selectors: [
      ['meta[name="og:image"]', 'value'],
      ['meta[property="og:image"]', 'content'],
      ['meta[itemprop="image"]', 'content'],
      ['meta[name="twitter:image"]', 'content'],
      ['img.attachment-large', 'src'],
    ],
  },

  content: {
    selectors: [
      [
        '.elementor-section-wrap',
        'p, .elementor-text-editor > ul > li, .attachment-large',
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
