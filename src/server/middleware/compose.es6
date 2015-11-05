
export default function compose(...middlewares) {
  return function *(next) {
    yield middlewares.reduceRight((acc, m) => {
      return m.call(this, acc)
    }, next)
  }
}
