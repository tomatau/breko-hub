import { createLogger } from 'redux-logger'
import promiseMiddleware from 'redux-promise-middleware'
import thunkMiddleware from 'redux-thunk'
import createSagaMiddleware from 'redux-saga'
import { outClientViaSocketIO } from 'redux-via-socket.io'
import { pipe, tap } from 'ramda'
import { isBrowser } from 'app/utils'

export const sagaMiddleware = createSagaMiddleware()

export const middleware = [
  thunkMiddleware,
  promiseMiddleware(),
  sagaMiddleware,
]

/* istanbul ignore else  */
if (isBrowser) {
  middleware.push(
    outClientViaSocketIO(require('./socket')),
    createLogger({
      predicate: () => debug.enabled,
      collapsed: true,
    })
  )
} else {
  const log = debug('DISPATCH:')

  middleware.unshift(
    () => next => pipe(tap(log), next)
  )
}
