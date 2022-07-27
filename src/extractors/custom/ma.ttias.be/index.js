export const MaTtiasBeExtractor = {
  domain: 'ma.ttias.be',

  title: {
    selectors: [['meta[name="twitter:title"]', 'value']],
  },

  author: {
    selectors: [['meta[name="author"]', 'value']],
  },

  date_published: {
    selectors: [['meta[name="article:published_time"]', 'value']],
  },

  content: {
    selectors: [['.content']],

    // Is there anything in the content you selected that needs transformed
    // before it's consumable content? E.g., unusual lazy loaded images
    transforms: {
      h2: $node => {
        // The "id" attribute values would result in low scores and the element being
        // removed.
        $node.attr('id', null);

        // h1 elements will be demoted to h2, so demote h2 elements to h3.
        return 'h3';
      },
      h1: $node => {
        // The "id" attribute values would result in low scores and the element being
        // removed.
        $node.attr('id', null);

        // A subsequent h2 will be removed if there is not a paragraph before it, so
        // add a paragraph here. It will be removed anyway because it is empty.
        $node.after('<p></p>');
      },
      ul: $node => {
        // Articles contain lists of links which look like, but are not, navigation
        // elements. Adding this class attribute avoids them being incorrectly removed.
        $node.attr('class', 'entry-content-asset');
      },
    },
  },
};
