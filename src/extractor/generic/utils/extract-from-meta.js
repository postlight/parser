import { stripTags } from '../../utils/dom'

// Given a node type to search for, and a list of meta tag names to
// search for, find a meta tag associated.
// metaNames can be an array of strings of an array of three-element
// arrays that will define the attributes to select from the meta
// elements. E.g., ['og:image', 'property', 'content'] will search
// $('meta[property=og:image]').attr('content').
//
// Default is $('meta[name=og:image]').attr(value)
export default function extractFromMeta(
  $,
  metaNames,
  cachedNames,
  cleanTags=true,
) {
  const foundNames = metaNames.filter(name => {
    const metaType = typeof name

    if (metaType === 'string') {
      return cachedNames.indexOf(name) !== -1
    } else if (metaType === 'object') {
      return cachedNames.indexOf(name[0]) !== 1
    }
  })

  for (let name of foundNames) {
    let type, value

    if (typeof name === 'string') {
      type = 'name'
      value = 'value'
    } else {
      type = name[1]
      value = name[2]
      name = name[0]
    }

    const nodes = $(`meta[${type}="${name}"]`)

    // Get the unique value of every matching node, in case there
    // are two meta tags with the same name and value.
    // Remove empty values.
    const values =
      nodes.map((index, node) => $(node).attr(value))
                               .toArray()
                               .filter(text => text !== '')

    // If we have more than one value for the same name, we have a
    // conflict and can't trust any of them. Skip this name. If we have
    // zero, that means our meta tags had no values. Skip this name
    // also.
    if (values.length !== 1) {
      continue
    }

    let metaValue
    // Meta values that contain HTML should be stripped, as they
    // weren't subject to cleaning previously.
    if (cleanTags) {
      metaValue = stripTags(values[0], $)
    } else {
      metaValue = values[0]
    }

    return metaValue
  }

  // If nothing is found, return null
  return null
}
