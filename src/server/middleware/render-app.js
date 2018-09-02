import React from 'react'
import ReactDOMServer from 'react-dom/server'
import Loadable from 'react-loadable'
import { getBundles } from 'react-loadable/webpack'
import { compact, isEnv, isOneOf } from 'app/utils'
import { LOADABLE_FILE } from 'config/paths'
import { CONTAINER_ELEMENT_ID } from 'config/constants'
import makeHtmlBody from 'server/utils/make-html-body'
import StaticRouter from 'server/components/StaticRouter'
import * as app from 'app/main'

const log = debug('render-app')
const isClientRedirect = isOneOf([ 'PUSH', 'REPLACE' ])
const JS_FILE_REGEX = /.*\.js$/

export default function () {
  return async function renderApp(ctx) {
    await Loadable.preloadAll()

    const modules = []
    const __html = ReactDOMServer.renderToString(
      <Loadable.Capture report={mod => modules.push(mod)}>
        {app.Main(ctx.store, ctx.history, StaticRouter)}
      </Loadable.Capture>
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
        bodyScripts: compact([
          ...getBundles(require(LOADABLE_FILE), modules)
            .filter(bundle => JS_FILE_REGEX.test(bundle.file))
            .map(bundle => bundle.publicPath),
          ...ctx.assets.bodyScripts,
        ]),
        content: [ {
          id: CONTAINER_ELEMENT_ID,
          dangerouslySetInnerHTML: { __html },
        } ],
      })
    }
  }
}
