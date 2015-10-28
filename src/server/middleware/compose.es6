
export default function compose(...middlewares) {
  return function *(next) {
    const len = middlewares.length;
    yield middlewares.reduceRight((acc, m, i) =>
      m.call(this, i == len ? next : acc)
    )
  }
}
