export const WwwZdfDeExtractor = {
  domain: 'www.zdf.de',

  title: {
    selectors: [
      ['meta[name="og:title"]', 'value'],
      ['meta[name="twitter:title"]', 'value'],
    ],
  },

  author: {
    selectors: ['.author-wrap div span'],
  },

  date_published: {
    selectors: [['meta[name="zdf:publicationDate"]', 'value']],
  },

  dek: {
    selectors: [],
  },

  lead_image_url: {
    defaultCleaner: false,
    selectors: [['meta[name="og:image"]', 'value']],
  },

  content: {
    defaultCleaner: false,
    selectors: ['.content-item', '.b-post-content', '.teaser-foot'],

    // Is there anything in the content you selected that needs transformed
    // before it's consumable content? E.g., unusual lazy loaded images
    transforms: {
      '[data-zdfplayer-teaser-image]': $node => {
        const teaserElement = $node;
        const attribute = teaserElement.attr('data-zdfplayer-teaser-image');
        if (attribute) {
          const imageJson = JSON.parse(attribute);
          let imageUrl = imageJson['1920x1080'];
          if (imageUrl) {
            teaserElement.replaceWith(
              `<img src="${imageUrl}" width="960" height="540">`
            );
            return;
          }
          imageUrl = imageJson['768x432'];
          if (imageUrl) {
            teaserElement.replaceWith(
              `<img src="${imageUrl}" width="384" height="216">`
            );
          }
        }
      },
      'h1, h2, h3, h4, h5, h6': $node => {
        $node.before('<p></p>');
        $node.attr('id', null);
        $node.attr('class', null);
      },
      'img[data-src]': $node => {
        $node.attr('src', $node.attr('data-src'));
      },
      '.b-heute-video .content-box': 'figure',
      '.b-heute-video .content-box .details': 'figcaption',
    },

    // Is there anything that is in the result that shouldn't be?
    // The clean selectors will remove anything that matches from
    // the result
    clean: [
      '.more-details',
      '.other-infos',
      '.b-content-module',
      '.teaser-foot',
    ],
  },
};
