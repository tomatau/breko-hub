import createLogger from 'redux-logger'
import promiseMiddleware from 'redux-promise-middleware'
import thunkMiddleware from 'redux-thunk'
import { isBrowser } from 'app/utils/predicates'
import { socket } from 'app/state/socket'
import { outClientViaSocketIO } from 'redux-via-socket.io'
import { syncHistory } from 'react-router-redux'
import { history } from 'app/state/history'

const log = {
  action: debug('DISPATCH:'),
}
export const defaultMiddleware = [
  thunkMiddleware,
  promiseMiddleware(),
]
export const middleware = [
  ...defaultMiddleware,
]
// unused export, listenForReplays is currently buggy...
export const routerReduxMiddleware = syncHistory(history)

if (isBrowser()) {
  middleware.push(
    routerReduxMiddleware,
    outClientViaSocketIO(socket),
    createLogger({
      predicate: () => process.env.NODE_ENV === 'development',
    })
  )
} else {
  middleware.push(
    () => next => action => {
      log.action(action)
      next(action)
    }
  )
}
