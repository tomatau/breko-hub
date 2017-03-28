import { routerMiddleware } from 'react-router-redux'
import { makeCreateStore } from 'app/composition/makeCreateStore'
import { middleware } from 'app/composition/middleware'
import rootReducer from 'app/reducers'
import createStaticHistory from 'server/utils/createStaticHistory'

const log = debug('set-store')

export default async function setStore(ctx, next) {
  log('setting server store')
  // make a clean history for each request
  ctx.history = createStaticHistory(ctx.request.url)

  // make a clean store for each request
  ctx.store = makeCreateStore([
    ...middleware,
    routerMiddleware(ctx.history),
  ])(rootReducer, {})

  await next()
}
