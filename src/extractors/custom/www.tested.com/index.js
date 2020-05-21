export const WwwTestedComExtractor = {
  domain: 'www.tested.com',

  title: {
    selectors: ['section.info a.title'],
  },

  content: {
    defaultCleaner: false,
    selectors: [
      // 'p.description'
      '.featured-publishable',
      '.featured-publishable-podcast',
    ],

    // Is there anything in the content you selected that needs transformed
    // before it's consumable content? E.g., unusual lazy loaded images
    transforms: {
      '.youtube-video': ($node, $) => {
        const videoElement = $('.youtube-video[data-video-id]').attr(
          'data-video-id'
        );
        $node.replaceWith(
          `<div class="unread_youtube_content"><iframe type="text/html" src="https://www.youtube.com/embed/${videoElement}" frameborder="0" width="854" height="480" allowfullscreen></iframe></div>`
        );
      },
      'span.author': 'p',
    },

    // Is there anything that is in the result that shouldn't be?
    // The clean selectors will remove anything that matches from
    // the result
    clean: [
      '.share',
      '.well-header-wrap',
      'img[src*="icon-lock.png"]',
      '.podcast-player',
    ],
  },
};
