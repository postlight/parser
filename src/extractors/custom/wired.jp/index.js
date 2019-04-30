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
    selectors: ['time'],
    format: 'YYYY.MM.DD dddd HH:mm',
    timezone: 'Asia/Tokyo',
  },

  dek: null,

  lead_image_url: {
    selectors: [['meta[name="og:image"]', 'value']],
  },

  content: {
    selectors: ['article.article-detail'],

    transforms: {
      'img[data-original]': $node => {
        const dataOriginal = $node.attr('data-original');
        const src = $node.attr('src');
        const url = URL.parse(src);
        const origin = `${url.protocol}//${url.hostname}`;
        $node.attr('src', origin + dataOriginal);
      },
    },

    clean: ['.post-category', 'time', 'h1.post-title', '.social-area-syncer'],
  },
};
