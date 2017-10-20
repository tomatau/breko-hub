import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import rootReducer from 'app/reducers'

const log = debug('create-store')

export default (middleware, initialState) => {
  const store = createStore(
    rootReducer,
    initialState,
    composeWithDevTools(
      applyMiddleware(...middleware),
    ),
  )

  if (module.hot) {
    module.hot.accept('app/reducers', () => {
      const { rootReducer } = require('app/reducers')
      log(`Replacing store's root reducer`)
      store.replaceReducer(rootReducer)
    })
  }

  return store
}
