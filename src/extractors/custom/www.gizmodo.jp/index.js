export const WwwGizmodoJpExtractor = {
  domain: 'www.gizmodo.jp',

  title: {
    selectors: ['h1.p-post-title'],
  },

  author: {
    selectors: ['li.p-post-AssistAuthor'],
  },

  date_published: {
    selectors: [['li.p-post-AssistTime time', 'datetime']],
  },

  dek: null,

  lead_image_url: {
    selectors: [['meta[name="og:image"]', 'value']],
  },

  content: {
    selectors: ['article.p-post'],

    transforms: {
      'img.p-post-thumbnailImage': $node => {
        const src = $node.attr('src');
        $node.attr('src', src.replace(/^.*=%27/, '').replace(/%27;$/, ''));
      },
    },

    clean: ['h1.p-post-title', 'ul.p-post-Assist'],
  },
};
