import {
  STRIP_OUTPUT_TAGS,
} from './constants';

export default function stripJunkTags(article, $) {
  $(STRIP_OUTPUT_TAGS.join(','), article).remove();

  return $;
}
