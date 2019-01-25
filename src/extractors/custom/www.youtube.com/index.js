export const WwwYoutubeComExtractor = {
  domain: 'www.youtube.com',

  title: {
    selectors: ['.watch-title', 'h1.watch-title-container'],
  },

  author: {
    selectors: ['.yt-user-info'],
  },

  date_published: {
    selectors: [['meta[itemProp="datePublished"]', 'value']],

    timezone: 'GMT',
  },

  dek: {
    selectors: [
      // enter selectors
    ],
  },

  lead_image_url: {
    selectors: [['meta[name="og:image"]', 'value']],
  },

  content: {
    defaultCleaner: false,

    selectors: [['#player-api', '#eow-description']],

    // Is there anything in the content you selected that needs transformed
    // before it's consumable content? E.g., unusual lazy loaded images
    transforms: {
      '#player-api': ($node, $) => {
        const videoId = $('meta[itemProp="videoId"]').attr('value');
        $node.html(`
          <iframe src="https://www.youtube.com/embed/${videoId}" frameborder="0" allowfullscreen></iframe>`);
      },
    },

    // Is there anything that is in the result that shouldn't be?
    // The clean selectors will remove anything that matches from
    // the result
    clean: [],
  },
};
