export const WwwLifehackerJpExtractor = {
  domain: 'www.lifehacker.jp',

  title: {
    selectors: ['h1[class^="article_pArticle_Title"]', 'h1.lh-summary-title'],
  },

  author: {
    selectors: [
      ['meta[name="author"]', 'value'],
      'p.lh-entryDetailInner--credit',
    ],
  },

  date_published: {
    selectors: [
      ['meta[name="article:published_time"]', 'value'],
      ['div.lh-entryDetail-header time', 'datetime'],
    ],
  },

  dek: null,

  lead_image_url: {
    selectors: [['meta[name="og:image"]', 'value']],
  },

  content: {
    selectors: [
      'div[class^="article_pArticle_Body__"]',
      'div.lh-entryDetail-body',
    ],

    transforms: {
      'img.lazyload': $node => {
        const src = $node.attr('src');
        $node.attr('src', src.replace(/^.*=%27/, '').replace(/%27;$/, ''));
      },
    },

    clean: ['p.lh-entryDetailInner--credit'],
  },
};
