import createLogger from 'redux-logger'
import promiseMiddleware from 'redux-promise-middleware'
import thunkMiddleware from 'redux-thunk'
import { hasWindow } from 'app/utils/predicates'
import { socket } from 'app/services/socket'
import { outClientViaSocketIO } from 'redux-via-socket.io'
import createSagaMiddleware from 'redux-saga'

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

export const sagaMiddleware = createSagaMiddleware()

if (hasWindow) {
  middleware.push(
    sagaMiddleware,
    outClientViaSocketIO(socket),
    createLogger({
      predicate: () => debug.enabled(),
      collapsed: true,
    })
  )
} else {
  middleware.push(
    () => next => action => {
      if (!action.MONITOR_ACTION)
        log.action(action)
      next(action)
    }
  )
}
