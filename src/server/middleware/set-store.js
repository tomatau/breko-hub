import { routerMiddleware } from 'react-router-redux'
import createStore from 'app/composition/create-store'
import { middleware } from 'app/composition/middleware'
import { createMemoryHistory } from 'history'

const log = debug('set-store')

export default async function setStore(ctx, next) {
  log('setting server store')
  ctx.history = createMemoryHistory({
    initialEntries: [ ctx.request.url ],
  })

  ctx.store = createStore(
    {},
    [ ...middleware, routerMiddleware(ctx.history) ],
  )

  await next()
}
