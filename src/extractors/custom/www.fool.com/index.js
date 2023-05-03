export const WwwFoolComExtractor = {
  domain: 'www.fool.com',

  title: {
    selectors: ['h1'],
  },

  author: {
    selectors: [
      ['meta[name="author"]', 'value'],
      '.author-inline .author-name',
    ],
  },

  date_published: {
    selectors: [['meta[name="date"]', 'value']],
  },

  dek: {
    selectors: [['meta[name="og:description"]', 'value'], 'header h2'],
  },

  lead_image_url: {
    selectors: [['meta[name="og:image"]', 'value']],
  },

  content: {
    selectors: ['.tailwind-article-body', '.article-content'],

    // Is there anything in the content you selected that needs transformed
    // before it's consumable content? E.g., unusual lazy loaded images
    transforms: {
      '.caption img': $node => {
        const src = $node.attr('src');
        $node.parent().replaceWith(`<figure><img src="${src}"/></figure>`);
      },
      '.caption': 'figcaption',
    },

    // Is there anything that is in the result that shouldn't be?
    // The clean selectors will remove anything that matches from
    // the result
    clean: ['#pitch'],
  },
};
