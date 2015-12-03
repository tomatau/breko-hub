
export default function compose(...middlewares) {
  if (!middlewares.length || middlewares.some(m => typeof m != 'function'))
    throw new TypeError('Compose requires middleware arguments')
  return function *(next) {
    yield middlewares.reduceRight((acc, m) => {
      return m.call(this, acc)
    }, next)
  }
}
