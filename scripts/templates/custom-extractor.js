import template from './index';

export default function (hostname) {
  return template`
    // Rename CustomExtractor
    // to fit your publication
    // (e.g., NYTimesExtractor)
    export const CustomExtractor = {
      domain: '${hostname}',
      title: {
        selectors: [
          // enter title selectors
        ],
      },

      author: {
        selectors: [
          // enter author selectors
        ],
      },

      content: {
        selectors: [
          // enter content selectors
        ],

        // Is there anything in the content you selected that needs transformed
        // before it's consumable content? E.g., unusual lazy loaded images
        transforms: [
        ],

        // Is there anything that is in the result that shouldn't be?
        // The clean selectors will remove anything that matches from
        // the result
        clean: [

        ]
      },

      date_published: null,

      lead_image_url: null,

      dek: null,

      next_page_url: null,

      excerpt: null,
    }
  `;
}
