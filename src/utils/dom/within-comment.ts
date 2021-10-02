import { getAttrs } from './get-attrs';

export function withinComment($node: cheerio.Cheerio) {
  const parents = $node.parents().toArray();
  const commentParent = parents.find(parent => {
    const attrs = getAttrs(parent);
    const { class: nodeClass, id } = attrs;
    const classAndId = `${nodeClass} ${id}`;
    return classAndId.includes('comment');
  });

  return commentParent !== undefined;
}
