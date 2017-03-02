export const WwwElmercurioComExtractor = {
  domain: 'www.elmercurio.com',

  title: {
    selectors: [
      '.titulo_despliegue_nota',
    ],
  },

  author: {
    selectors: [
      '.txt_autor',
    ],
  },

  date_published: {
    selectors: [
      '.fecha_despliegue_nota',
    ],
  },

  dek: {
    selectors: [
      '.bajada_despliegue_nota',
    ],
  },

  lead_image_url: {
    selectors: [

    ],
  },

  content: {
    selectors: [
      '.content_info_despliegue',
    ],

    // Is there anything in the content you selected that needs transformed
    // before it's consumable content? E.g., unusual lazy loaded images
    transforms: {
    },

    // Is there anything that is in the result that shouldn't be?
    // The clean selectors will remove anything that matches from
    // the result
    clean: [

    ],
  },
};
