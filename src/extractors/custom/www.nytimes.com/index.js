export const NYTimesExtractor = {
  domain: 'www.nytimes.com',

  title: {
    selectors: [
      'h1.g-headline',
      'h1[itemprop="headline"]',
      'h1.headline',
      'h1 .balancedHeadline',
    ],
  },

  author: {
    selectors: [
      ['meta[name="author"]', 'value'],
      '.g-byline',
      '.byline',
      ['meta[name="byl"]', 'value'],
    ],
  },

  content: {
    selectors: ['div.g-blocks', 'section[name="articleBody"]', 'article#story'],

    transforms: {
      'img.g-lazy': $node => {
        let src = $node.attr('src');
        const width = 640;

        src = src.replace('{{size}}', width);
        $node.attr('src', src);
      },
    },

    clean: [
      '.ad',
      'header#story-header',
      '.story-body-1 .lede.video',
      '.visually-hidden',
      '#newsletter-promo',
      '.promo',
      '.comments-button',
      '.hidden',
      '.comments',
      '.supplemental',
      '.nocontent',
      '.story-footer-links',
    ],
  },

  date_published: {
    selectors: [['meta[name="article:published"]', 'value']],
  },

  lead_image_url: {
    selectors: [['meta[name="og:image"]', 'value']],
  },

  dek: null,

  next_page_url: null,

  excerpt: null,
};
