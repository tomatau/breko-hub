export const generator = function *(next) {
  yield next
}

export default function() {
  return generator
}
