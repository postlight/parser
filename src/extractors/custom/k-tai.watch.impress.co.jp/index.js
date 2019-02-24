export const KtaiWatchImpressCoJpExtractor = {
  domain: 'k-tai.watch.impress.co.jp',

  title: {
    selectors: [['meta[name="og:title"]', 'value']],
  },

  author: {
    selectors: ['#main article div div.article-info ul li'],
  },

  date_published: {
    selectors: [['meta[name="creation_date"]', 'value']],
  },

  dek: {
    selectors: [['meta[name="og:description"]', 'value']],
  },

  lead_image_url: {
    selectors: [['meta[name="og:image"]', 'value']],
  },

  content: {
    selectors: ['#main article div div.main-contents.mainContents'],

    transforms: {
      img: $node => {
        const src = $node.attr('ajax');
        if (src !== '') {
          $node.attr('src', src);
        }
      },
    },

    clean: [],
  },
};
