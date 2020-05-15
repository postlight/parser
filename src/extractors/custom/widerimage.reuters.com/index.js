export const WiderimageReutersComExtractor = {
  domain: 'widerimage.reuters.com',

  title: {
    selectors: [['meta[name="og:title"]', 'value']],
  },

  lead_image_url: {
    selectors: [['meta[name="og:image"]', 'value']],
  },

  content: {
    selectors: [['.entry-hero, .entry-content']],

    // Is there anything in the content you selected that needs transformed
    // before it's consumable content? E.g., unusual lazy loaded images
    transforms: {
      figure: $node => {
        const text = $node.find('.widget-content');
        text.remove();
        $node.after(text);
      },
      '.image-caption': 'figcaption',
    },

    // Is there anything that is in the result that shouldn't be?
    // The clean selectors will remove anything that matches from
    // the result
    clean: ['.figure-meta', '.story-meta'],
  },
};
