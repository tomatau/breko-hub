import { routerMiddleware, LOCATION_CHANGE } from 'react-router-redux'
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

  ctx.store.dispatch({
    type: LOCATION_CHANGE,
    payload: ctx.history.location,
  })

  await next()
}
