import { compose, createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import createLogger from 'redux-logger'
import { persistState } from 'redux-devtools'
import promiseMiddleware from 'redux-promise-middleware'
import { isBrowser } from '~/src/app/utils/predicates'
import DevTools from '~/src/app/components/containers/DevTools'

export const defaultMiddleware = [
  thunkMiddleware,
  promiseMiddleware(),
]

export const makeCreateStore = (middleware=defaultMiddleware) => {
  const BROWSER = isBrowser()
  const DEVELOPMENT = process.env.NODE_ENV === 'development'

  if (BROWSER)
    middleware.push(
      createLogger({
        predicate: () => DEVELOPMENT,
      })
    )

  const topLevelMiddleware = [ applyMiddleware(...middleware) ]

  if (DEVELOPMENT) {
    topLevelMiddleware.push(DevTools.instrument())
    if (BROWSER)
      topLevelMiddleware.push(persistState(
        window.location.href.match(/[?&]debug_session=([^&]+)\b/)
      ))
  }

  return compose(...topLevelMiddleware)(createStore)
}
