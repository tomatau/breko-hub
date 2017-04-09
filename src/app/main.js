import { createBrowserHistory, createMemoryHistory } from 'history'
import { ConnectedRouter, routerMiddleware } from 'react-router-redux'
import { Provider } from 'react-redux'
import { inClientViaSocketIO } from 'redux-via-socket.io'

import { middleware, sagaMiddleware } from 'app/composition/middleware'
import { makeCreateStore } from 'app/composition/makeCreateStore'
import socket from 'app/composition/socket'

import rootSaga from 'app/sagas'
import { isBrowser } from 'app/utils'
import rootReducer from 'app/reducers'
import * as app from 'app'

// client store and history
// can go out of sync with server store and server history...
// avoid using directly!
export const history = isBrowser ? createBrowserHistory() : createMemoryHistory()

export const store = makeCreateStore(
  [ ...middleware, routerMiddleware(history) ]
)(rootReducer, isBrowser ? window.__INITIAL_STATE__ : {})

inClientViaSocketIO(socket, store.dispatch)

sagaMiddleware.run(rootSaga)

export const Main = (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      {app.createAppInstance()}
    </ConnectedRouter>
  </Provider>
)

/* istanbul ignore if  */
if (module.hot) {
  /* istanbul ignore next */
  module.hot.accept('app/reducers', () => {
    store.replaceReducer(require('app/reducers'))
  })
}
