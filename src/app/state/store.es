import { isBrowser } from 'app/utils/predicates'
import { makeCreateStore } from 'app/state/makeCreateStore'
import { history } from 'app/state/history'
import rootReducer from 'app/reducers'
import { middleware } from 'app/state/middleware'
import { socket } from 'app/state/socket'
import debug from 'debug'
import { syncReduxAndRouter } from 'redux-simple-router'
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
  syncReduxAndRouter(history, store)
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
