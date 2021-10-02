export interface ExtractorOptions {
  /**
   * Remove any elements that match non-article-like criteria first.
   * (Like, does this element have a classname of "comment")
   */
  stripUnlikelyCandidates?: boolean;

  /**
   * Modify an elements score based on whether it has
   * certain classNames or IDs. Examples: Subtract if a node has
   * a className of 'comment', Add if a node has an ID of
   * 'entry-content'.
   */
  weightNodes?: boolean;
}
