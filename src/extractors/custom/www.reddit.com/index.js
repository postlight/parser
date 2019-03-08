export const WwwRedditComExtractor = {
  domain: 'www.reddit.com',

  title: {
    selectors: ['div[data-test-id="post-content"] h2'],
  },

  author: {
    selectors: ['div[data-test-id="post-content"] a[href*="user/"]'],
  },

  date_published: {
    selectors: [
      'div[data-test-id="post-content"] a[data-click-id="timestamp"]',
    ],
  },

  lead_image_url: {
    selectors: [['meta[name="og:image"]', 'value']],
  },

  content: {
    selectors: [
      ['div[data-test-id="post-content"] p'], // text post
      [
        'div[data-test-id="post-content"] a[target="_blank"]:not([data-click-id="timestamp"])', // external link
        'div[data-test-id="post-content"] div[data-click-id="media"]', // embedded media
      ], // external link with media preview (YouTube, imgur album, etc...)
      ['div[data-test-id="post-content"] div[data-click-id="media"]'], // Embedded media (Reddit video)
      [
        'div[data-test-id="post-content"] a[target="_blank"]:not([data-click-id="timestamp"])',
      ], // external link
      'div[data-test-id="post-content"]',
    ],

    // Is there anything in the content you selected that needs transformed
    // before it's consumable content? E.g., unusual lazy loaded images
    transforms: {
      'div[role="img"]': $node => {
        // External link image preview
        const $img = $node.find('img');
        const bgImg = $node.css('background-image');
        if ($img.length === 1 && bgImg) {
          $img.attr('src', bgImg.match(/\((.*?)\)/)[1].replace(/('|")/g, ''));
          return $img;
        }
        return $node;
      },
    },

    // Is there anything that is in the result that shouldn't be?
    // The clean selectors will remove anything that matches from
    // the result
    clean: ['.icon'],
  },
};
