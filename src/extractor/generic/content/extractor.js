import cheerio from 'cheerio'
import 'babel-polyfill'

import extractBestNode from './extract-best-node'
import nodeIsSufficient from '../../utils/node-is-sufficient'
import extractCleanNode from './extract-clean-node'
import { normalizeSpaces } from './utils/text'

const GenericContentExtractor = {
  defaultOpts: {
    stripUnlikelyCandidates: true,
    weightNodes: true,
    cleanConditionally: true,
  },

  // Entry point for parsing html
  parse($, html, title='', opts={}) {
    opts = { ...this.defaultOpts, ...opts }

    return this.extract($, html, opts, title)
  },

  // Extract the content for this resource - initially, pass in our
  // most restrictive opts which will return the highest quality
  // content. On each failure, retry with slightly more lax opts.
  //
  // :param return_type: string. If "node", should return the content
  // as a cheerio node rather than as an HTML string.
  //
  // Opts:
  // stripUnlikelyCandidates: Remove any elements that match
  // non-article-like criteria first.(Like, does this element
  //   have a classname of "comment")
  //
  // weightNodes: Modify an elements score based on whether it has
  // certain classNames or IDs. Examples: Subtract if a node has
  // a className of 'comment', Add if a node has an ID of
  // 'entry-content'.
  //
  // cleanConditionally: Clean the node to return of some
  // superfluous content. Things like forms, ads, etc.
  extract($, html, opts, title) {
    $ = $ || cheerio.load(html)

    // Cascade through our extraction-specific opts in an ordered fashion,
    // turning them off as we try to extract content.
    let node = extractCleanNode(
                extractBestNode($, opts),
                $,
                opts.cleanConditionally)

    if (nodeIsSufficient(node)) {
      return this.cleanAndReturnNode(node, $)
    } else {
      // We didn't succeed on first pass, one by one disable our
      // extraction opts and try again.
      for (const key of Reflect.ownKeys(opts).filter(key => opts[key] === true)) {
        opts[key] = false
        $ = cheerio.load(html)

        node = extractCleanNode(
                    extractBestNode($, opts),
                    $,
                    opts.cleanConditionally)

        if (nodeIsSufficient(node)) {
          break
        }
      }

      return this.cleanAndReturnNode(node, $)
    }

    return this.cleanAndReturnNode(node, $)
  },

  // Once we got here, either we're at our last-resort node, or
  // we broke early. Make sure we at least have -something- before we
  // move forward.
  cleanAndReturnNode(node, $) {
    if (!node) {
      return null
    }
    // Remove our scoring information from our content
    node.removeAttr('score')
    node.find('[score]').removeAttr('score')

    return normalizeSpaces($.html(node))

    // if return_type == "html":
    //     return normalize_spaces(node_to_html(node))
    // else:
    //     return node
  },

}

export default GenericContentExtractor
