import ReactDOMServer from 'react-dom/server'
import { Html } from 'server/components/Html'
import { compact } from 'lodash'
import { makeContent } from 'app/utils/makeContent'

function makeHtml(initialState, assets, content) {
  return ReactDOMServer.renderToString(
    <Html
      initialState={initialState}
      headScripts={compact([ assets.javascript.head ])}
      bodyScripts={compact([ assets.javascript.body ])}
      headStyles={compact([ assets.styles.body ])}
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
      makeContent(routeContext, store)
    )
    this.response.body = `<!doctype html>${html}`
  }
}
