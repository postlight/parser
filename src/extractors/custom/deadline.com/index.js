export const DeadlineComExtractor = {
  domain: 'deadline.com',

  title: {
    selectors: ['h1'],
  },

  author: {
    selectors: ['section.author h3'],
  },

  date_published: {
    selectors: [['meta[name="article:published_time"]', 'value']],
  },

  dek: null,

  lead_image_url: {
    selectors: [['meta[name="og:image"]', 'value']],
  },

  content: {
    selectors: ['div.a-article-grid__main.pmc-a-grid article.pmc-a-grid-item'],

    transforms: {
      '.embed-twitter': $node => {
        const innerHtml = $node.html();
        $node.replaceWith(innerHtml);
      },
    },

    clean: [],
  },
};
