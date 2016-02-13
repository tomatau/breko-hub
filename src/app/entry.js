import ReactDOM from 'react-dom'
import { Router } from 'react-router'
import { after } from 'lodash'
import { compose } from 'ramda'
import { trigger } from 'redial'
import { makeContent } from 'app/utils/makeContent'
import { history } from 'app/state/history'
import { store } from 'app/state/store'
import makeRoutes from 'app/makeRoutes'
import DevTools from 'app/components/containers/DevTools'
import { socket } from 'app/state/socket'
import { inClientViaSocketIO } from 'redux-via-socket.io'

debug.enable(process.env.DEBUG)

const log = {
  env: debug('environment'),
  sock: debug('socket'),
}

const { dispatch } = store

log.env(`Running in [${process.env.NODE_ENV}] environment`)

inClientViaSocketIO(socket, dispatch)

// example socket broadcast
/*socket.on('connect', () => {
  log.sock('Client connected to socket')
  dispatch({
    type: 'NEW_SOCKET_SESSION',
    payload: { data: Math.random() },
    meta: { broadcast: true, next: false },
  })
})*/

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

ReactDOM.render(
  makeContent(
    <Router history={history} onUpdate={onRouteUpdate}>
      {makeRoutes()}
    </Router>, store),
  document.getElementById('application-root')
)

if (process.env.NODE_ENV === 'development') {
  ReactDOM.render(
    makeContent(<DevTools />, store),
    document.getElementById('debug-panel-root')
  )
}

if (module.hot) {
  module.hot.accept('./reducers', () =>
    store.replaceReducer(require('./reducers'))
  )
}
