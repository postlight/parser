export const WwwLatimesComExtractor = {
  domain: 'www.latimes.com',

  title: {
    selectors: ['.trb_ar_hl'],
  },

  author: {
    selectors: [['meta[name="author"]', 'value']],
  },

  date_published: {
    selectors: [['meta[itemprop="datePublished"]', 'value']],
  },

  lead_image_url: {
    selectors: [['meta[name="og:image"]', 'value']],
  },

  content: {
    selectors: ['.trb_ar_main'],

    // Is there anything in the content you selected that needs transformed
    // before it's consumable content? E.g., unusual lazy loaded images
    transforms: {
      '.trb_ar_la': $node => {
        const $figure = $node.find('figure');
        $node.replaceWith($figure);
      },
    },

    // Is there anything that is in the result that shouldn't be?
    // The clean selectors will remove anything that matches from
    // the result
    clean: ['.trb_ar_by', '.trb_ar_cr'],
  },
};
