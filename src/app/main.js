import { Router } from 'react-router'
import { after } from 'lodash'
import { compose } from 'ramda'
import { Provider } from 'react-redux'
import { trigger } from 'redial'
import { inClientViaSocketIO } from 'redux-via-socket.io'
import { history } from 'app/services/history'
import { socket } from 'app/services/socket'
import { store, dispatch } from 'app/services/store'
import makeRoutes from 'app/routes'
import DevTools from 'app/components/containers/DevTools'

inClientViaSocketIO(socket, dispatch)

function routeLocalsTrigger(event) {
  return function() {
    const { components, location, params } = this.state
    trigger(event, components, { dispatch, location, params })
  }
}

const onRouteUpdate = compose(
  routeLocalsTrigger('defer'),
  // ignore first update, pre-fetched data already in server render
  after(2, routeLocalsTrigger('prefetch'))
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
