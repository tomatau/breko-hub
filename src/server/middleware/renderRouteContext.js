import { Provider } from 'react-redux'
import { makeHtml } from 'server/utils'

export default function renderRouteContext(assets) {
  return function *() {
    const { routeContext, store } = this

    this.response.body = makeHtml(
      store.getState(),
      assets,
      <Provider store={store}>
        {routeContext}
      </Provider>
    )
  }
}
