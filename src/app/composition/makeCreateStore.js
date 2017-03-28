import { compose, createStore, applyMiddleware } from 'redux'
import { isBrowser, isEnv } from 'app/utils'

export const makeCreateStore = (middleware) => {
  const topLevelMiddleware = [ applyMiddleware(...middleware) ]

  /* istanbul ignore if  */
  if (isEnv('development')) {
    if (isBrowser && window.__REDUX_DEVTOOLS_EXTENSION__ != null) {
      topLevelMiddleware.push(window.__REDUX_DEVTOOLS_EXTENSION__())
    }
  }

  return compose(...topLevelMiddleware)(createStore)
}
