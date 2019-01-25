export const WwwRefinery29ComExtractor = {
  domain: 'www.refinery29.com',

  title: {
    selectors: ['h1.title'],
  },

  author: {
    selectors: ['.contributor'],
  },

  date_published: {
    selectors: [['meta[name="sailthru.date"]', 'value']],

    timezone: 'America/New_York',
  },

  lead_image_url: {
    selectors: [['meta[name="og:image"]', 'value']],
  },

  content: {
    selectors: [
      ['.full-width-opener', '.article-content'],
      '.article-content',
      '.body',
    ],

    // Is there anything in the content you selected that needs transformed
    // before it's consumable content? E.g., unusual lazy loaded images
    transforms: {
      'div.loading noscript': $node => {
        const imgHtml = $node.html();
        $node.parents('.loading').replaceWith(imgHtml);
      },

      '.section-image': 'figure',

      '.section-image .content-caption': 'figcaption',

      '.section-text': 'p',
    },

    // Is there anything that is in the result that shouldn't be?
    // The clean selectors will remove anything that matches from
    // the result
    clean: ['.story-share'],
  },
};
