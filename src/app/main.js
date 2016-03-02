import { Router } from 'react-router'
import { after } from 'lodash'
import { compose } from 'ramda'
import { Provider } from 'react-redux'
import { trigger } from 'redial'
import { store } from 'app/services/store'
import { history } from 'app/services/history'
import makeRoutes from 'app/routes'
import DevTools from 'app/components/containers/DevTools'

const { dispatch } = store

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
