import ReactDOMServer from 'react-dom/server'
import { ChunkExtractor } from '@loadable/server'
import { isEnv, isOneOf } from 'app/utils'
import { LOADABLE_FILE } from 'config/paths'
import { CONTAINER_ELEMENT_ID } from 'config/constants'
import makeHtmlBody from 'server/utils/make-html-body'
import StaticRouter from 'server/components/StaticRouter'
import * as app from 'app/main'

const log = debug('render-app')
const isClientRedirect = isOneOf([ 'PUSH', 'REPLACE' ])

export default function () {
  return async function renderApp(ctx) {
    const extractor = new ChunkExtractor({ statsFile: LOADABLE_FILE })
    const __html = ReactDOMServer.renderToString(
      extractor.collectChunks(
        app.Main(ctx.store, ctx.history, StaticRouter)
      )
    )

    if (isClientRedirect(ctx.history.action)) {
      log('302 redirect to', ctx.history.location.pathname)
      ctx.status = 302
      ctx.redirect(ctx.history.location.pathname)
    } else {
      log('setting html response body')
      ctx.response.body = makeHtmlBody({
        ...ctx.assets, /* ctx.assets set in map-assets*/
        stringScripts: [
          ...ctx.assets.stringScripts,
          `window.__INITIAL_STATE__ = ${
            JSON.stringify(ctx.store.getState(), null, isEnv('development') && 2)
          };`,
        ],
        headElements: [
          ...extractor.getLinkElements(),
          ...extractor.getStyleElements(),
        ],
        bodyElements: [
          ...extractor.getScriptElements(),
        ],
        content: [ {
          id: CONTAINER_ELEMENT_ID,
          dangerouslySetInnerHTML: { __html },
        } ],
      })
    }
  }
}
