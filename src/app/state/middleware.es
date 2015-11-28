import createLogger from 'redux-logger'
import { isBrowser } from '~/src/app/utils/predicates'
import { defaultMiddleware } from '~/src/app/state/makeCreateStore'
import { socket } from '~/src/app/state/socket'
import { outClientViaSocketIO } from 'redux-via-socket.io'
import debug from 'debug'
const log = {
  action: debug('DISPATCH:'),
}

export const middleware = [
  ...defaultMiddleware,
]

if (isBrowser()) {
  middleware.push(
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
