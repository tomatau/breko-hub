import { Provider } from 'react-redux'
import { makeHtml } from 'server/utils'
const log = debug('render-route-context')

export default function renderRouteContext(assets) {
  return function *() {
    log('setting body')
    this.response.body = makeHtml(
      this.store.getState(),
      assets,
      <Provider store={this.store}>
        {this.routeContext}
      </Provider>
    )
  }
}
