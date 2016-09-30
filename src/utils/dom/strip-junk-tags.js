import {
  STRIP_OUTPUT_TAGS,
} from './constants';

export default function stripJunkTags(article, $, tags = []) {
  if (tags.length === 0) {
    tags = STRIP_OUTPUT_TAGS;
  }

  $(tags.join(','), article).remove();

  return $;
}
