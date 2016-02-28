import ReactDOMServer from 'react-dom/server'
import { Provider } from 'react-redux'
import { Html } from 'server/components/Html'
import { filter, identity } from 'ramda'

const compact = filter(identity)

function makeHtml(initialState, assets, content) {
  return ReactDOMServer.renderToString(
    <Html
      initialState={initialState}
      headScripts={compact([ assets.javascript.head ])}
      bodyScripts={compact([ assets.javascript.body ])}
      headStyles={compact([ assets.styles.body, assets.styles.head ])}
      bodyStyles={compact([ ])}
      children={content}
    />
  )
}

export default function renderRouteContext(assets) {
  return function *() {
    const { routeContext, store } = this
    const html = makeHtml(
      store.getState(),
      assets,
      <Provider store={store}>
        {routeContext}
      </Provider>
    )
    this.response.body = `<!doctype html>${html}`
  }
}
