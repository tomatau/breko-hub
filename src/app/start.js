import ReactDOM from 'react-dom'
import { ConnectedRouter, routerMiddleware } from 'react-router-redux'
import { createBrowserHistory } from 'history'
import { inClientViaSocketIO } from 'redux-via-socket.io'
import Loadable from 'react-loadable'
import { CONTAINER_ELEMENT_ID } from 'config/constants'
import { middleware } from 'app/composition/middleware'
import createStore from 'app/composition/create-store'
import socket from 'app/composition/socket'
import { run, Main } from 'app/main'

const log = debug('start')

const history = createBrowserHistory()

const store = createStore(
  window.__INITIAL_STATE__ || {},
  [ ...middleware, routerMiddleware(history) ],
)

inClientViaSocketIO(socket, store.dispatch)

socket.open()

run()

;(async function () {
  await Loadable.preloadReady()

  log(`Mounting onto #${CONTAINER_ELEMENT_ID}`)

  ReactDOM.hydrate(
    Main(store, history, ConnectedRouter),
    document.getElementById(CONTAINER_ELEMENT_ID)
  )
}())
