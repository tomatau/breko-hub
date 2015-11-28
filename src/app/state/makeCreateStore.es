import { compose, createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { persistState } from 'redux-devtools'
import promiseMiddleware from 'redux-promise-middleware'
import { isBrowser } from '~/src/app/utils/predicates'
import DevTools from '~/src/app/components/containers/DevTools'

export const defaultMiddleware = [
  thunkMiddleware,
  promiseMiddleware(),
]

export const makeCreateStore = (middleware=defaultMiddleware) => {
  const topLevelMiddleware = [ applyMiddleware(...middleware) ]

  if (process.env.NODE_ENV === 'development') {
    topLevelMiddleware.push(DevTools.instrument())

    if (isBrowser()) {
      topLevelMiddleware.push(persistState(
        window.location.href.match(/[?&]debug_session=([^&]+)\b/)
      ))
    }
  }

  return compose(...topLevelMiddleware)(createStore)
}
