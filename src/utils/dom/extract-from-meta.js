import { stripTags } from 'utils/dom';

// Given a node type to search for, and a list of meta tag names to
// search for, find a meta tag associated.
export default function extractFromMeta(
  $,
  metaNames,
  cachedNames,
  cleanTags = true
) {
  const foundNames = metaNames.filter(name => cachedNames.indexOf(name) !== -1);

  // eslint-disable-next-line no-restricted-syntax
  for (const name of foundNames) {
    const type = 'name';
    const value = 'value';

    const nodes = $(`meta[${type}="${name}"]`);

    // Get the unique value of every matching node, in case there
    // are two meta tags with the same name and value.
    // Remove empty values.
    const values = nodes
      .map((index, node) => $(node).attr(value))
      .toArray()
      .filter(text => text !== '');

    // If we have more than one value for the same name, we have a
    // conflict and can't trust any of them. Skip this name. If we have
    // zero, that means our meta tags had no values. Skip this name
    // also.
    if (values.length === 1) {
      let metaValue;
      // Meta values that contain HTML should be stripped, as they
      // weren't subject to cleaning previously.
      if (cleanTags) {
        metaValue = stripTags(values[0], $);
      } else {
        [metaValue] = values;
      }

      return metaValue;
    }
  }

  // If nothing is found, return null
  return null;
}
