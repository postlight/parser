// Rename CustomExtractor
// to fit your publication
// (e.g., NYTimesExtractor)
export const ApartmentTherapyExtractor = {
  domain: 'www.apartmenttherapy.com',
  title: {
    selectors: ['h1.headline'],
  },

  author: {
    selectors: ['.PostByline__name'],
  },

  content: {
    selectors: ['div.post__content'],

    // Is there anything in the content you selected that needs transformed
    // before it's consumable content? E.g., unusual lazy loaded images
    transforms: {
      'div[data-render-react-id="images/LazyPicture"]': ($node, $) => {
        const data = JSON.parse($node.attr('data-props'));
        const { src } = data.sources[0];
        const $img = $('<img />').attr('src', src);
        $node.replaceWith($img);
      },
    },

    // Is there anything that is in the result that shouldn't be?
    // The clean selectors will remove anything that matches from
    // the result
    clean: [],
  },

  date_published: {
    selectors: [['.PostByline__timestamp[datetime]', 'datetime']],
  },

  lead_image_url: {
    selectors: [['meta[name="og:image"]', 'value']],
  },

  dek: {
    selectors: [],
  },

  next_page_url: {
    selectors: [
      // enter selectors
    ],
  },

  excerpt: {
    selectors: [
      // enter selectors
    ],
  },
};
