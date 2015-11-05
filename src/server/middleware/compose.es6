
export default function compose(...middlewares) {
  return function *(next) {
    const len = middlewares.length;
    yield middlewares.reduceRight((acc, m, i) => {
      return m.call(this, acc)
    }, next)
  }
}
