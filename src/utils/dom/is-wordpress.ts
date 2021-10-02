import { IS_WP_SELECTOR } from './constants';

export function isWordpress($: cheerio.Root) {
  return $(IS_WP_SELECTOR).length > 0;
}
