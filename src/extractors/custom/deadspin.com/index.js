export const DeadspinExtractor = {
  domain: 'deadspin.com',

  supportedDomains: [
    'jezebel.com',
    'lifehacker.com',
    'kotaku.com',
    'gizmodo.com',
    'jalopnik.com',
    'kinja.com',
    'avclub.com',
    'clickhole.com',
    'splinternews.com',
    'theonion.com',
    'theroot.com',
    'thetakeout.com',
    'theinventory.com',
  ],

  title: {
    selectors: ['title'],
  },

  author: {
    selectors: ['.author'],
  },

  content: {
    selectors: [['.js_post-content'], ['.post-content'], ['.entry-content']],

    // Is there anything in the content you selected that needs transformed
    // before it's consumable content? E.g., unusual lazy loaded images
    transforms: {
      'iframe.lazyload[data-recommend-id^="youtube://"]': $node => {
        const youtubeId = $node.attr('id').split('youtube-')[1];
        $node.attr('src', `https://www.youtube.com/embed/${youtubeId}`);
      },

      // Prevent h4 elements from being deleted by preceding them with
      // empty pargraphs.
      h4: $node => {
        // The "id" attribute values would result in low scores and the element being
        // removed.
        $node.before('<p></p>');
      },
    },

    // Is there anything that is in the result that shouldn't be?
    // The clean selectors will remove anything that matches from
    // the result
    clean: ['.magnifier', '.lightbox'],
  },

  date_published: {
    selectors: [
      ['time.updated[datetime]', 'datetime'],
      ['time[datetime]', 'datetime'],
    ],
  },

  lead_image_url: {
    selectors: [['meta[name="og:image"]', 'value']],
  },

  dek: {
    selectors: [
      // enter selectors
    ],
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
