import { createMemoryHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import { makeCreateStore } from 'app/composition/makeCreateStore'
import rootReducer from 'app/reducers'
import { middleware } from 'app/composition/middleware'

const log = debug('set-store')

export default async function setStore(ctx, next) {
  log('setting server store')
  ctx.store = makeCreateStore(middleware)(rootReducer, {})
  syncHistoryWithStore(
    createMemoryHistory(ctx.request.url),
    ctx.store
  )
  await next()
}
