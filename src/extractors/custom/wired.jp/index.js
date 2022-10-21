import URL from 'url';

export const WiredJpExtractor = {
  domain: 'wired.jp',

  title: {
    selectors: ['h1[data-testid="ContentHeaderHed"]', 'h1.post-title'],
  },

  author: {
    selectors: [
      ['meta[name="article:author"]', 'value'],
      'p[itemprop="author"]',
    ],
  },

  date_published: {
    selectors: [
      ['meta[name="article:published_time"]', 'value'],
      ['time', 'datetime'],
    ],
  },

  dek: {
    selectors: ['div[class^="ContentHeaderDek"]', '.post-intro'],
  },

  lead_image_url: {
    selectors: [['meta[name="og:image"]', 'value']],
  },

  content: {
    selectors: [
      'div[data-attribute-verso-pattern="article-body"]',
      'article.article-detail',
    ],

    transforms: {
      'img[data-original]': $node => {
        const dataOriginal = $node.attr('data-original');
        const src = $node.attr('src');
        const url = URL.resolve(src, dataOriginal);
        $node.attr('src', url);
      },
    },

    clean: ['.post-category', 'time', 'h1.post-title', '.social-area-syncer'],
  },
};
