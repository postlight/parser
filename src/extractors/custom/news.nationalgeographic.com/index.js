export const NewsNationalgeographicComExtractor = {
  domain: 'news.nationalgeographic.com',

  title: {
    selectors: ['h1', 'h1.main-title'],
  },

  author: {
    selectors: ['.byline-component__contributors b span'],
  },

  date_published: {
    selectors: [['meta[name="article:published_time"]', 'value']],
    format: 'ddd MMM DD HH:mm:ss zz YYYY',
    timezone: 'EST',
  },

  dek: {
    selectors: ['.article__deck'],
  },

  lead_image_url: {
    selectors: [['meta[name="og:image"]', 'value']],
  },

  content: {
    selectors: [['.parsys.content', '.__image-lead__'], '.content'],

    // Is there anything in the content you selected that needs transformed
    // before it's consumable content? E.g., unusual lazy loaded images
    transforms: {
      '.parsys.content': ($node, $) => {
        const $imgSrc = $node
          .find('.image.parbase.section')
          .find('.picturefill')
          .first()
          .data('platform-src');
        if ($imgSrc) {
          $node.prepend($(`<img class="__image-lead__" src="${$imgSrc}"/>`));
        }
      },
    },

    // Is there anything that is in the result that shouldn't be?
    // The clean selectors will remove anything that matches from
    // the result
    clean: ['.pull-quote.pull-quote--large'],
  },
};
