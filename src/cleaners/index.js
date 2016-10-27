import cleanAuthor from './author';
import cleanImage from './lead-image-url';
import cleanDek from './dek';
import cleanDatePublished from './date-published';
import cleanContent from './content';
import cleanTitle from './title';

const Cleaners = {
  author: cleanAuthor,
  lead_image_url: cleanImage,
  dek: cleanDek,
  date_published: cleanDatePublished,
  content: cleanContent,
  title: cleanTitle,
};

export default Cleaners;

export { cleanAuthor };
export { cleanImage };
export { cleanDek };
export { cleanDatePublished };
export { cleanContent };
export { cleanTitle };
export { default as resolveSplitTitle } from './resolve-split-title';
