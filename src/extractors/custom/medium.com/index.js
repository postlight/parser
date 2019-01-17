export const MediumExtractor = {
  domain: 'medium.com',

  supportedDomains: ['trackchanges.postlight.com'],

  title: {
    selectors: ['h1'],
  },

  author: {
    selectors: [['meta[name="author"]', 'value']],
  },

  content: {
    selectors: [
      ['.section-content'],
      '.section-content',
      'article > div > section',
    ],

    // Is there anything in the content you selected that needs transformed
    // before it's consumable content? E.g., unusual lazy loaded images
    transforms: {
      // Re-write lazy-loaded youtube videos
      iframe: $node => {
        const ytRe = /https:\/\/i.embed.ly\/.+url=https:\/\/i\.ytimg\.com\/vi\/(\w+)\//;
        const thumb = decodeURIComponent($node.attr('data-thumbnail'));

        if (ytRe.test(thumb)) {
          const [_, youtubeId] = thumb.match(ytRe); // eslint-disable-line
          $node.attr('src', `https://www.youtube.com/embed/${youtubeId}`);
          const $parent = $node.parents('figure');
          const $caption = $parent.find('figcaption');
          $parent.empty().append([$node, $caption]);
        }
      },

      // rewrite figures to pull out image and caption, remove rest
      figure: $node => {
        // ignore if figure has an iframe
        if ($node.find('iframe').length > 0) return;

        const $img = $node.find('img').slice(-1)[0];
        const $caption = $node.find('figcaption');
        $node.empty().append([$img, $caption]);
      },
    },

    // Is there anything that is in the result that shouldn't be?
    // The clean selectors will remove anything that matches from
    // the result
    clean: [],
  },

  date_published: {
    selectors: [['time[datetime]', 'datetime']],
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
