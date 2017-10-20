import { createBrowserHistory, createMemoryHistory } from 'history'
import { ConnectedRouter, routerMiddleware } from 'react-router-redux'
import { Provider } from 'react-redux'
import { inClientViaSocketIO } from 'redux-via-socket.io'

import { middleware, sagaMiddleware } from 'app/composition/middleware'
import createStore from 'app/composition/create-store'
import socket from 'app/composition/socket'

import rootSaga from 'app/sagas'
import { isBrowser } from 'app/utils'
import app from 'app'

// client store and history
// can go out of sync with server store and server history...
// avoid using directly!
export const history = isBrowser ? createBrowserHistory() : createMemoryHistory()

export const store = createStore(
  [ ...middleware, routerMiddleware(history) ],
  window.__INITIAL_STATE__ || {}
)

inClientViaSocketIO(socket, store.dispatch)

sagaMiddleware.run(rootSaga)

export const Main = (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      {app.createAppInstance()}
    </ConnectedRouter>
  </Provider>
)
