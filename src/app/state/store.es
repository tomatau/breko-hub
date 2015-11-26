import { isBrowser } from '~/src/app/utils/predicates'
import { makeCreateStore } from '~/src/app/state/configureStore'
import { history } from '~/src/app/state/history'
import rootReducer from '~/src/app/reducers'
import { middleware } from '~/src/app/state/middleware'
import { socket } from '~/src/app/state/socket'
import debug from 'debug'
import { syncReduxAndRouter } from 'redux-simple-router'
import { inClientViaSocketIO } from 'redux-via-socket.io'

const log = {
  store: debug('store'),
  sock: debug('socket'),
}

export const store = makeCreateStore(middleware)(
  rootReducer, isBrowser() ? window.__INITIAL_STATE__ : {}
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
