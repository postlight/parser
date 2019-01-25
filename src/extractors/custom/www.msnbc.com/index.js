export const WwwMsnbcComExtractor = {
  domain: 'www.msnbc.com',

  title: {
    selectors: ['h1', 'h1.is-title-pane'],
  },

  author: {
    selectors: ['.author'],
  },

  date_published: {
    selectors: [['meta[name="DC.date.issued"]', 'value']],
  },

  dek: {
    selectors: [['meta[name="description"]', 'value']],
  },

  lead_image_url: {
    selectors: [['meta[name="og:image"]', 'value']],
  },

  content: {
    selectors: ['.pane-node-body'],

    // Is there anything in the content you selected that needs transformed
    // before it's consumable content? E.g., unusual lazy loaded images
    transforms: {
      '.pane-node-body': ($node, $) => {
        const [
          selector,
          attr,
        ] = WwwMsnbcComExtractor.lead_image_url.selectors[0];
        const src = $(selector).attr(attr);
        if (src) {
          $node.prepend(`<img src="${src}" />`);
        }
      },
    },

    // Is there anything that is in the result that shouldn't be?
    // The clean selectors will remove anything that matches from
    // the result
    clean: [],
  },
};
