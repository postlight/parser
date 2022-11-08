export const WwwYoutubeComExtractor = {
  domain: 'www.youtube.com',

  title: {
    selectors: [
      ['meta[name="title"]', 'value'],
      '.watch-title',
      'h1.watch-title-container',
    ],
  },

  author: {
    selectors: [['link[itemprop="name"]', 'content'], '.yt-user-info'],
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

    selectors: [
      '#player-container-outer',
      'ytd-expandable-video-description-body-renderer #description',
      ['#player-api', '#description'],
    ],

    // Is there anything in the content you selected that needs transformed
    // before it's consumable content? E.g., unusual lazy loaded images
    transforms: {
      '#player-api': ($node, $) => {
        const videoId = $('meta[itemProp="videoId"]').attr('value');
        $node.html(`
          <iframe src="https://www.youtube.com/embed/${videoId}" frameborder="0" allowfullscreen></iframe>`);
      },
      '#player-container-outer': ($node, $) => {
        const videoId = $('meta[itemProp="videoId"]').attr('value');
        const description = $('meta[itemProp="description"]').attr('value');
        $node.html(`
        <iframe src="https://www.youtube.com/embed/${videoId}" frameborder="0" allowfullscreen></iframe>
        <div><span>${description}</span></div>`);
      },
    },

    // Is there anything that is in the result that shouldn't be?
    // The clean selectors will remove anything that matches from
    // the result
    clean: [],
  },
};
