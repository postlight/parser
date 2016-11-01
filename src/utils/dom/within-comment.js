export default function withinComment($node) {
  const parents = $node.parents().toArray();
  const commentParent = parents.find((parent) => {
    debugger // eslint-disable-line
    const { attribs: { class: nodeClass, id } = {} } = parent;
    const classAndId = `${nodeClass} ${id}`;
    return classAndId.includes('comment');
  });

  return commentParent !== undefined;
}
