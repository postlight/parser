import {
  getOrInitScore,
  setScore,
} from './index'

export default function addScore($node, $, amount) {
  try {
    const score = getOrInitScore($node, $) + amount
    setScore($node, $, score)
  } catch(e) {
    console.debug(e)
  } finally {
    return $node
  }
}
