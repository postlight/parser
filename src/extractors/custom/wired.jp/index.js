import URL from 'url';

export const WiredJpExtractor = {
  domain: 'wired.jp',

  title: {
    selectors: ['h1.post-title'],
  },

  author: {
    selectors: ['p[itemprop="author"]'],
  },

  date_published: {
    selectors: [['time', 'datetime']],
  },

  dek: {
    selectors: ['.post-intro'],
  },

  lead_image_url: {
    selectors: [['meta[name="og:image"]', 'value']],
  },

  content: {
    selectors: ['article.article-detail'],

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
