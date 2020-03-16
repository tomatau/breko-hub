import React from 'react'
import * as R from 'ramda'
import ReactDOMServer from 'react-dom/server'
import { ChunkExtractor, ChunkExtractorManager } from '@loadable/server'
import { HelmetProvider } from 'react-helmet-async'
import { isEnv, get, isOneOf } from 'app/utils'
import { LOADABLE_FILE } from 'config/paths'
import { CONTAINER_ELEMENT_ID } from 'config/constants'
import makeHtmlBody from 'server/utils/make-html-body'
import StaticRouter from 'server/components/StaticRouter'
import * as app from 'app/main'

const log = debug('render-app')

const isRedirect = R.compose(
  isOneOf([ 'PUSH', 'REPLACE' ]),
  get('history.action')
)
const getPathname = get('history.location.pathname')
const getLocationFlashState = get('history.location.state.flash', {})

export default function () {
  return async function renderApp(ctx) {
    const extractor = new ChunkExtractor({ statsFile: LOADABLE_FILE })

    const helmetContext = {}
    const __html = ReactDOMServer.renderToString(
      <ChunkExtractorManager extractor={extractor}>
        <HelmetProvider context={helmetContext}>
          {app.Main(ctx.store, ctx.history, StaticRouter)}
        </HelmetProvider>
      </ChunkExtractorManager>
    )

    if (isRedirect(ctx)) {
      const url = getPathname(ctx)
      const locationState = getLocationFlashState(ctx)
      ctx.addFlash(locationState.message, locationState.type)
      log('302 redirect to', url)
      ctx.status = 302
      ctx.redirect(url)
    } else {
      log('setting html response body')
      ctx.response.body = makeHtmlBody({
        helmetContext,
        ...ctx.assets, /* ctx.assets set in map-assets*/
        inlineScripts: [
          ...ctx.assets.inlineScripts,
          `window.__INITIAL_STATE__ = ${
            JSON.stringify(
              ctx.store.getState(),
              null,
              isEnv('development') ? 2 : 0,
            )
          };`,
        ],
        headElements: [
          ...extractor.getLinkElements(),
          ...extractor.getStyleElements(),
        ],
        bodyDivs: [ {
          id: CONTAINER_ELEMENT_ID,
          dangerouslySetInnerHTML: { __html },
        } ],
        bodyElements: [
          ...extractor.getScriptElements(),
        ],
      })
    }
  }
}
