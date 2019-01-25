export const WwwNprOrgExtractor = {
  domain: 'www.npr.org',

  title: {
    selectors: ['h1', '.storytitle'],
  },

  author: {
    selectors: ['p.byline__name.byline__name--block'],
  },

  date_published: {
    selectors: [
      ['.dateblock time[datetime]', 'datetime'],
      ['meta[name="date"]', 'value'],
    ],
  },

  lead_image_url: {
    selectors: [
      ['meta[name="og:image"]', 'value'],
      ['meta[name="twitter:image:src"]', 'value'],
    ],
  },

  content: {
    selectors: ['.storytext'],

    // Is there anything in the content you selected that needs transformed
    // before it's consumable content? E.g., unusual lazy loaded images
    transforms: {
      '.bucketwrap.image': 'figure',
      '.bucketwrap.image .credit-caption': 'figcaption',
    },

    // Is there anything that is in the result that shouldn't be?
    // The clean selectors will remove anything that matches from
    // the result
    clean: ['div.enlarge_measure'],
  },
};
