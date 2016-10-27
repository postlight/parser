export const NYTimesExtractor = {
  domain: 'www.nytimes.com',

  title: {
    selectors: [
      '.g-headline',
      'h1.headline',
    ],
  },

  author: {
    selectors: [
      ['meta[name="author"]', 'value'],
      '.g-byline',
      '.byline',
    ],
  },

  content: {
    selectors: [
      'div.g-blocks',
      'article#story',
    ],

    defaultCleaner: false,

    transforms: {
      'img.g-lazy': ($node) => {
        let src = $node.attr('src');
        // const widths = $node.attr('data-widths')
        //                   .slice(1)
        //                   .slice(0, -1)
        //                   .split(',');
        // if (widths.length) {
        //   width = widths.slice(-1);
        // } else {
        //   width = '900';
        // }
        const width = 640;

        src = src.replace('{{size}}', width);
        $node.attr('src', src);
      },
    },

    clean: [
      '.ad',
      'header#story-header',
      '.story-body-1 .lede.video',
      '.visually-hidden',
      '#newsletter-promo',
      '.promo',
      '.comments-button',
      '.hidden',
    ],
  },

  date_published: null,

  lead_image_url: null,

  dek: null,

  next_page_url: null,

  excerpt: null,
};
