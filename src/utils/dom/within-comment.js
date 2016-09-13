export default function withinComment($node) {
  const parents = $node.parents().toArray();
  const commentParent = parents.find((parent) => {
    const classAndId = `${parent.attribs.class} ${parent.attribs.id}`;
    return classAndId.includes('comment');
  });

  return commentParent !== undefined;
}
