import createLogger from 'redux-logger'
import promiseMiddleware from 'redux-promise-middleware'
import thunkMiddleware from 'redux-thunk'
import { isBrowser } from 'app/utils/predicates'
import { socket } from 'app/state/socket'
import { outClientViaSocketIO } from 'redux-via-socket.io'
import { syncHistory } from 'redux-simple-router'
import { history } from 'app/state/history'
import debug from 'debug'

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

if (isBrowser()) {
  middleware.push(
    syncHistory(history),
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
