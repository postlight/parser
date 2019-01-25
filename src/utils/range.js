export default function* range(start = 1, end = 1) {
  while (start <= end) {
    yield (start += 1);
  }
}
