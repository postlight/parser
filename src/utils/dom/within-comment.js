export default function withinComment(node, $) {
  const parents = $(node).parents().toArray()
  const commentParent = parents.find((parent) => {
    const classAndId = `${$(parent).attr('class')} ${$(parent).attr('id')}`
    return classAndId.includes('comment')
  })

  return commentParent !== undefined
}
