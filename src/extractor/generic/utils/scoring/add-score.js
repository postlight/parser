import {
  getScore,
  setScore,
} from './index'

export default function addScore(node, $, amount) {
  const score = getScore(node, $) + amount
  setScore(node, $, score)
  return node
}
