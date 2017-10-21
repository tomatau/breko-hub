
export default function () {
  return function *(next) {
    yield next
  }
}
