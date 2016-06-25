import { Provider } from 'react-redux'
import { makeHtml } from 'server/utils'
const log = debug('render-route-context')

export default function(assets) {
  return function *renderRouteContext() {
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
