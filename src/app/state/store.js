import { isBrowser } from 'app/utils/predicates'
import { makeCreateStore } from 'app/state/makeCreateStore'
import rootReducer from 'app/reducers'
import { middleware } from 'app/state/middleware'
import { socket } from 'app/state/socket'
import debug from 'debug'
import { inClientViaSocketIO } from 'redux-via-socket.io'
import { enableBatching } from 'redux-batched-actions'

const log = {
  store: debug('store'),
  sock: debug('socket'),
}

export const store = makeCreateStore(middleware)(
  enableBatching(rootReducer),
  isBrowser() ? window.__INITIAL_STATE__ : {}
)

if (isBrowser()) {
  inClientViaSocketIO(socket, store.dispatch)
  socket.on('connect', () => {
    log.sock('Client connected to socket')
    store.dispatch({
      type: 'NEW_SOCKET_SESSION',
      payload: { data: Math.random() },
      meta: { broadcast: true, next: false },
    })
  })
}
