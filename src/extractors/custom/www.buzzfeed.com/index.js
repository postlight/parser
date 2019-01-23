// Rename CustomExtractor
// to fit your publication
// (e.g., NYTimesExtractor)
export const BuzzfeedExtractor = {
  domain: 'www.buzzfeed.com',
  title: {
    selectors: [
      'h1[id="post-title"]',
      // enter title selectors
    ],
  },

  author: {
    selectors: [
      'a[data-action="user/username"]',
      'byline__author',
      // enter author selectors
    ],
  },

  content: {
    selectors: [
      ['.longform_custom_header_media', '#buzz_sub_buzz'],
      '#buzz_sub_buzz',
    ],

    defaultCleaner: false,

    // Is there anything in the content you selected that needs transformed
    // before it's consumable content? E.g., unusual lazy loaded images
    transforms: {
      h2: 'b',

      'div.longform_custom_header_media': $node => {
        if ($node.has('img') && $node.has('.longform_header_image_source')) {
          return 'figure';
        }

        return null;
      },

      'figure.longform_custom_header_media .longform_header_image_source':
        'figcaption',
    },

    // Is there anything that is in the result that shouldn't be?
    // The clean selectors will remove anything that matches from
    // the result
    clean: [
      '.instapaper_ignore',
      '.suplist_list_hide .buzz_superlist_item .buzz_superlist_number_inline',
      '.share-box',
      '.print',
    ],
  },

  date_published: {
    selectors: ['.buzz-datetime'],
  },

  lead_image_url: {
    selectors: [['meta[name="og:image"]', 'value']],
  },

  dek: {
    selectors: [],
  },

  next_page_url: null,

  excerpt: null,
};
