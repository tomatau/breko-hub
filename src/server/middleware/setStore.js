import { routerMiddleware } from 'react-router-redux'
import { makeCreateStore } from 'app/composition/makeCreateStore'
import { middleware } from 'app/composition/middleware'
import rootReducer from 'app/reducers'
import { createMemoryHistory } from 'history'

const log = debug('set-store')

export default async function setStore(ctx, next) {
  log('setting server store')
  ctx.history = createMemoryHistory({
    initialEntries: [ ctx.request.url ],
  })

  ctx.store = makeCreateStore([
    ...middleware,
    routerMiddleware(ctx.history),
  ])(rootReducer, {})

  await next()
}
