import { Router } from 'react-router'
import { after } from 'lodash'
import { compose } from 'ramda'
import { Provider } from 'react-redux'
import { trigger } from 'redial'
import { inClientViaSocketIO } from 'redux-via-socket.io'
import { history } from 'app/composition/history'
import socket from 'app/composition/socket'
import { store } from 'app/composition/store'
import makeRoutes from 'app/routes'
import DevTools from 'app/components/DevTools/DevTools'
import { sagaMiddleware } from 'app/composition/middleware'
import rootSaga from 'app/sagas'

inClientViaSocketIO(socket, store.dispatch)
sagaMiddleware.run(rootSaga)

function routeLocalsTrigger(event) {
  return function() {
    const { components, location, params } = this.state
    trigger(event, components, { dispatch: store.dispatch, location, params })
  }
}

const onRouteUpdate = compose(
  // ignore first defer call because of initial LOCATION_CHANGE event
  after(2, routeLocalsTrigger('defer')),
  // ignore first 2, pre-fetched data already in server render
  after(3, routeLocalsTrigger('prefetch'))
)

export const Main = (
  <Provider store={store}>
    <Router history={history} onUpdate={onRouteUpdate}>
      {makeRoutes()}
    </Router>
  </Provider>
)

export const Dev = (
  <Provider store={store}>
    <DevTools />
  </Provider>
)
