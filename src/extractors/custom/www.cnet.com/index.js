export const WwwCnetComExtractor = {
  domain: 'www.cnet.com',

  title: {
    selectors: [['meta[name="og:title"]', 'value']],
  },

  author: {
    selectors: ['a.author'],
  },

  date_published: {
    selectors: ['time'],

    timezone: 'America/Los_Angeles',
  },

  dek: {
    selectors: ['.article-dek'],
  },

  lead_image_url: {
    selectors: [['meta[name="og:image"]', 'value']],
  },

  content: {
    selectors: [
      ['img.__image-lead__', '.article-main-body'],
      '.article-main-body',
    ],

    // Is there anything in the content you selected that needs transformed
    // before it's consumable content? E.g., unusual lazy loaded images
    transforms: {
      'figure.image': $node => {
        const $img = $node.find('img');
        $img.attr('width', '100%');
        $img.attr('height', '100%');
        $img.addClass('__image-lead__');
        $node.remove('.imgContainer').prepend($img);
      },
    },

    // Is there anything that is in the result that shouldn't be?
    // The clean selectors will remove anything that matches from
    // the result
    clean: [],
  },
};
