
export default function compose(...middlewares) {
  return function *(next) {
    yield middlewares.reduce(
      (acc, m) => m.call(this, acc),
      middlewares.pop().call(this, next)
    )
  }
}
