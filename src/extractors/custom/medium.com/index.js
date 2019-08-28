export const MediumExtractor = {
  domain: 'medium.com',

  title: {
    selectors: ['h1', ['meta[name="og:title"]', 'value']],
  },

  author: {
    selectors: [['meta[name="author"]', 'value']],
  },

  content: {
    selectors: ['article'],

    // Is there anything in the content you selected that needs transformed
    // before it's consumable content? E.g., unusual lazy loaded images
    transforms: {
      // Re-write lazy-loaded youtube videos
      iframe: $node => {
        const ytRe = /https:\/\/i.embed.ly\/.+url=https:\/\/i\.ytimg\.com\/vi\/(\w+)\//;
        const thumb = decodeURIComponent($node.attr('data-thumbnail'));
        const $parent = $node.parents('figure');

        if (ytRe.test(thumb)) {
          const [_, youtubeId] = thumb.match(ytRe); // eslint-disable-line
          $node.attr('src', `https://www.youtube.com/embed/${youtubeId}`);
          const $caption = $parent.find('figcaption');
          $parent.empty().append([$node, $caption]);
          return;
        }

        // If we can't draw the YouTube preview, remove the figure.
        $parent.remove();
      },

      // rewrite figures to pull out image and caption, remove rest
      figure: $node => {
        // ignore if figure has an iframe
        if ($node.find('iframe').length > 0) return;

        const $img = $node.find('img').slice(-1)[0];
        const $caption = $node.find('figcaption');

        $node.empty().append([$img, $caption]);
      },

      // Remove any smaller images that did not get caught by the generic image
      // cleaner (author photo 48px, leading sentence images 79px, etc.).
      img: $node => {
        const width = parseInt($node.attr('width'), 10);
        if (width < 100) $node.remove();
      },
    },

    // Is there anything that is in the result that shouldn't be?
    // The clean selectors will remove anything that matches from
    // the result
    clean: ['span', 'svg'],
  },

  date_published: {
    selectors: [['meta[name="article:published_time"]', 'value']],
  },

  lead_image_url: {
    selectors: [['meta[name="og:image"]', 'value']],
  },

  dek: null,

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
