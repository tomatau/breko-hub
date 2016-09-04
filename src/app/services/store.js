import { isBrowser } from 'app/utils'
import { makeCreateStore } from 'app/services/makeCreateStore'
import rootReducer from 'app/reducers'
import { middleware, sagaMiddleware } from 'app/services/middleware'
import rootSaga from 'app/sagas'

export const store = makeCreateStore(middleware)(
  rootReducer,
  isBrowser ? window.__INITIAL_STATE__ : {}
)

sagaMiddleware.run(rootSaga)

export const { dispatch } = store

/* istanbul ignore if  */
if (module.hot) {
  /* istanbul ignore next */
  module.hot.accept('app/reducers', () => {
    store.replaceReducer(require('app/reducers'))
  })
}
