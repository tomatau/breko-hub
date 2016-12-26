import { createMemoryHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import { makeCreateStore } from 'app/composition/makeCreateStore'
import rootReducer from 'app/reducers'
import { middleware } from 'app/composition/middleware'

const log = debug('set-store')

export default function *setStore(next) {
  log('setting server store')
  this.store = makeCreateStore(middleware)(rootReducer, {})
  syncHistoryWithStore(createMemoryHistory(this.request.url), this.store)
  yield next
}
