import { isBrowser } from 'app/utils/predicates'
import { makeCreateStore } from 'app/services/makeCreateStore'
import rootReducer from 'app/reducers'
import { middleware } from 'app/services/middleware'

export const store = makeCreateStore(middleware)(
  rootReducer,
  isBrowser ? window.__INITIAL_STATE__ : {}
)

export const { dispatch } = store

if (module.hot) {
  module.hot.accept('app/reducers', () => {
    store.replaceReducer(require('app/reducers'))
  })
}
