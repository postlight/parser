export const WwwFtchineseComExtractor = {
  domain: 'www.ftchinese.com',

  title: {
    selectors: ['h1.story-headline'],
  },

  author: {
    selectors: ['span.story-author > a'],
  },

  date_published: {
    selectors: ['.story-time'],
  },

  dek: {
    selectors: ['.story-lead'],
  },

  lead_image_url: {
    selectors: [['.story-image.image >figure', 'data-url']],
  },

  content: {
    selectors: ['#story-body-container'],

    // Is there anything in the content you selected that needs transformed
    // before it's consumable content? E.g., unusual lazy loaded images
    transforms: {},

    // Is there anything that is in the result that shouldn't be?
    // The clean selectors will remove anything that matches from
    // the result
    clean: [
      'div.story-theme',
      'h1.story-headline',
      'div.story-byline',
      'div.mpu-container-instory',
      'div#story-action-placeholder',
      'div.clearfloat',
      '.o-ads.in-article-advert',
    ],
  },
};
