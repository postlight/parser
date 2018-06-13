export const WwwOregonliveComExtractor = {
  domain: 'www.oregonlive.com',

  title: {
    selectors: [
      ['meta[name=title]', 'value'],
      'h1.gallery_title',
    ],
  },

  author: {
    selectors: [
      '.gallery_slide_description p:first-child strong',
    ],
  },

  date_published: {
    selectors: [
      ['meta[name=article_date_original]', 'value'],
    ],
    timezone: 'America/Los_Angeles',
  },

  dek: {
    selectors: [
    ],
  },

  lead_image_url: {
    selectors: [
      ['meta[name="og:image"]', 'value'],
    ],
  },

  content: {
    selectors: [
      '#article_container',
    ],

    transforms: {
      '.asset_div': 'figure',
      'span.resimg': ($node, $) => {
        const $img = $(`<img src="${$node.attr('data-image')}" />`);

        $node.replaceWith($img);
      },
    },

    clean: [

    ],
  },
};
