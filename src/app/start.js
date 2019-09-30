import ReactDOM from 'react-dom'
import React from 'react'
import { ConnectedRouter, routerMiddleware } from 'connected-react-router'
import { createBrowserHistory } from 'history'
import { inClientViaSocketIO } from 'redux-via-socket.io'
import { loadableReady } from '@loadable/component'
import { HelmetProvider } from 'react-helmet-async'
import { CONTAINER_ELEMENT_ID } from 'config/constants'
import { middleware } from 'app/composition/middleware'
import createStore from 'app/composition/create-store'
import socket from 'app/composition/socket'
import { run, Main } from 'app/main'

const log = debug('start')

const history = createBrowserHistory()

history.listen(() => {
  // reset activeElement back to body on navigation
  document.activeElement.blur()
})

const store = createStore(
  history,
  window.__INITIAL_STATE__ || {},
  [ ...middleware, routerMiddleware(history) ],
)

log('wiring up redux web-socket sync')
inClientViaSocketIO(socket, store.dispatch)

socket.open()

log('initilizing sagas')
run()

;(async function () {
  log('preloading code split components from server')
  await loadableReady()

  log(`Mounting onto #${CONTAINER_ELEMENT_ID}`)

  ReactDOM.hydrate(
    <HelmetProvider>
      {Main(store, history, ConnectedRouter)}
    </HelmetProvider>,
    document.getElementById(CONTAINER_ELEMENT_ID)
  )
})()
