export const WwwNationalgeographicComExtractor = {
  domain: 'www.nationalgeographic.com',

  title: {
    selectors: ['h1', 'h1.main-title'],
  },

  author: {
    selectors: ['.byline-component__contributors b span'],
  },

  date_published: {
    selectors: [['meta[name="article:published_time"]', 'value']],
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
        const $imageParent = $node.children().first();
        if ($imageParent.hasClass('imageGroup')) {
          const $dataAttrContainer = $imageParent
            .find('.media--medium__container')
            .children()
            .first();
          const imgPath1 = $dataAttrContainer.data('platform-image1-path');
          const imgPath2 = $dataAttrContainer.data('platform-image2-path');
          if (imgPath2 && imgPath1) {
            $node.prepend(
              $(`<div class="__image-lead__">
                <img src="${imgPath1}"/>
                <img src="${imgPath2}"/>
              </div>`)
            );
          }
        } else {
          const $imgSrc = $node
            .find('.image.parbase.section')
            .find('.picturefill')
            .first()
            .data('platform-src');
          if ($imgSrc) {
            $node.prepend($(`<img class="__image-lead__" src="${$imgSrc}"/>`));
          }
        }
      },
    },

    // Is there anything that is in the result that shouldn't be?
    // The clean selectors will remove anything that matches from
    // the result
    clean: ['.pull-quote.pull-quote--small'],
  },
};
