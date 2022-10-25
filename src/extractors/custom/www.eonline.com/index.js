export const WwwEonlineComExtractor = {
  domain: 'www.eonline.com',

  title: {
    selectors: ['h1.article-detail__title', 'h1.article__title'],
  },

  author: {
    selectors: ['.article-detail__meta__author', '.entry-meta__author a'],
  },

  date_published: {
    selectors: [
      ['meta[name="article:published_time"]', 'value'],
      ['meta[itemprop="datePublished"]', 'value'],
    ],
  },

  lead_image_url: {
    selectors: [['meta[name="og:image"]', 'value']],
  },

  content: {
    selectors: [
      ['.article-detail__main-content section'],
      ['.post-content section, .post-content div.post-content__image'],
    ],

    // Is there anything in the content you selected that needs transformed
    // before it's consumable content? E.g., unusual lazy loaded images
    transforms: {
      'div.post-content__image': 'figure',
      'div.post-content__image .image__credits': 'figcaption',
    },

    // Is there anything that is in the result that shouldn't be?
    // The clean selectors will remove anything that matches from
    // the result
    clean: [],
  },
};
