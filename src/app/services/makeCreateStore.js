import { compose, createStore, applyMiddleware } from 'redux'
import { persistState } from 'redux-devtools'
import { isBrowser } from 'app/utils/predicates'
import DevTools from 'app/components/containers/DevTools'

export const makeCreateStore = (middleware) => {
  const topLevelMiddleware = [ applyMiddleware(...middleware) ]

  if (process.env.NODE_ENV === 'development') {
    topLevelMiddleware.push(DevTools.instrument())

    if (isBrowser) {
      topLevelMiddleware.push(persistState(
        window.location.href.match(/[?&]debug_session=([^&]+)\b/)
      ))
    }
  }

  return compose(...topLevelMiddleware)(createStore)
}
