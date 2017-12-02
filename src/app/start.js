import ReactDOM from 'react-dom'
import { ConnectedRouter, routerMiddleware } from 'react-router-redux'
import { AppContainer } from 'react-hot-loader'
import { createBrowserHistory } from 'history'
import { inClientViaSocketIO } from 'redux-via-socket.io'
import Loadable from 'react-loadable'
import { CONTAINER_ELEMENT_ID } from 'config/constants'
import { middleware } from 'app/composition/middleware'
import createStore from 'app/composition/create-store'
import socket from 'app/composition/socket'
import { run } from 'app/main'

const log = debug('start')

const history = createBrowserHistory()

const store = createStore(
  window.__INITIAL_STATE__ || {},
  [ ...middleware, routerMiddleware(history) ],
)

/* Socket Redux Synchronisation */
inClientViaSocketIO(socket, store.dispatch)

socket.open()

/* Saga Listener */
run()

/* Mount in DOM */
Loadable.preloadReady().then(() => mount())

if (module.hot) {
  module.hot.accept('app/main', mount)
}

function mount() {
  const { Main } = require('app/main')
  log(`Mounting onto #${CONTAINER_ELEMENT_ID}`)
  ReactDOM.hydrate(
    <AppContainer>
      {Main(store, history, ConnectedRouter)}
    </AppContainer>,
    document.getElementById(CONTAINER_ELEMENT_ID)
  )
}
