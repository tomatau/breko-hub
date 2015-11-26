import { isBrowser } from '~/src/app/utils/predicates'
import { defaultMiddleware } from '~/src/app/state/configureStore'
import { socket } from '~/src/app/state/socket'
import { outClientViaSocketIO } from 'redux-via-socket.io'

export const middleware = [
  ...defaultMiddleware,
]

if (isBrowser()) {
  middleware.push(
    outClientViaSocketIO(socket),
  )
}
