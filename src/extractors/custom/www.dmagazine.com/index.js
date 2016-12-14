export const WwwDmagazineComExtractor = {
  domain: 'www.dmagazine.com',

  title: {
    selectors: [
      'h1.story__title',
    ],
  },

  author: {
    selectors: [
      'span.story__info__item a',
    ],
  },

  date_published: {
    selectors: [
      // enter selectors
    ],
  },

  dek: {
    selectors: [
      '.story__subhead',
    ],
  },

  lead_image_url: {
    selectors: [
      'figure.wp-caption.aligncenter.size-',
    ],
  },

  content: {
    selectors: [
      '.story__content-l.story__content.story__content--is-slideshow-closed',
    ],

    // Is there anything in the content you selected that needs transformed
    // before it's consumable content? E.g., unusual lazy loaded images
    transforms: {
    },

    // Is there anything that is in the result that shouldn't be?
    // The clean selectors will remove anything that matches from
    // the result
    clean: [

    ],
  },
};
