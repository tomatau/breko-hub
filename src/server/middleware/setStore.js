import { createMemoryHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import { makeCreateStore } from 'app/services/makeCreateStore'
import rootReducer from 'app/reducers'
import { middleware } from 'app/services/middleware'

export default function *setStore(next) {
  this.store = makeCreateStore(middleware)(rootReducer, {})
  syncHistoryWithStore(createMemoryHistory(this.request.url), this.store)
  yield next
}
