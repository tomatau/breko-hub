import { isBrowser } from 'app/utils/predicates'
import { makeCreateStore } from 'app/state/makeCreateStore'
import rootReducer from 'app/reducers'
import { middleware } from 'app/state/middleware'
import { enableBatching } from 'redux-batched-actions'

export const store = makeCreateStore(middleware)(
  enableBatching(rootReducer),
  isBrowser() ? window.__INITIAL_STATE__ : {}
)
