import ReactDOM from 'react-dom'
import { Router } from 'react-router'
import { getPrefetchedData } from 'react-fetcher'
import { makeContent } from '~/src/app/utils/makeContent'
import { history } from '~/src/app/state/history'
import { store } from '~/src/app/state/store'
import makeRoutes from '~/src/app/makeRoutes'
import DevTools from '~/src/app/components/containers/DevTools'
import debug from 'debug'

debug.enable(process.env.DEBUG)

const log = {
  env: debug('environment'),
}

log.env(`Running in [${process.env.NODE_ENV}] environment`)

function handleRouterUpdate() {
  const { components, location, params } = this.state
  getPrefetchedData(components, { store, location, params })
}

ReactDOM.render(
  makeContent(
    <Router history={history} onUpdate={handleRouterUpdate}>
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
