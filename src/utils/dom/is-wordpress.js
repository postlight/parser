import { IS_WP_SELECTOR } from './constants';

export default function isWordpress($) {
  return $(IS_WP_SELECTOR).length > 0;
}
