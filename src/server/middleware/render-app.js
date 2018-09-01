import React from 'react'
import ReactDOMServer from 'react-dom/server'
import { LOCATION_CHANGE } from 'react-router-redux'
import Loadable from 'react-loadable'
import { getBundles } from 'react-loadable/webpack'
import { LOADABLE_FILE } from 'config/paths'
import { CONTAINER_ELEMENT_ID } from 'config/constants'
import { compact, isOneOf, get, isEnv } from 'app/utils'
import makeHtmlBody from 'server/utils/make-html-body'
import StaticRouter from 'server/components/StaticRouter'
import * as app from 'app/main'

const log = debug('render-app')
const isClientRedirect = isOneOf([ 'PUSH', 'REPLACE' ])
const getJavascripts = get('javascript', {})
const getStyles = get('styles', {})
const getFile = get('file', '')
const JS_FILE_REGEX = /.*\.js$/

export default function (assets) {
  const javascripts = getJavascripts(assets)
  const styles = getStyles(assets)

  return function renderApp(ctx) {
    ctx.store.dispatch({
      type: LOCATION_CHANGE,
      payload: ctx.history.location,
    })

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
      const bundles = getBundles(require(LOADABLE_FILE), modules)
      ctx.response.body = makeHtmlBody({
        headScripts: compact([
          javascripts.head,
        ]),
        headStyles: compact([
          styles.body,
          styles.head,
        ]),
        bodyScripts: compact([
          ...bundles
            .map(getFile)
            .filter(file => JS_FILE_REGEX.test(file))
            .map(file => `/${file}`),
          javascripts.body,
        ]),
        stringScripts: [
          `window.__INITIAL_STATE__ = ${
            JSON.stringify(ctx.store.getState(), null, isEnv('development') && 2)
          };`,
        ],
        content: [ {
          id: CONTAINER_ELEMENT_ID,
          dangerouslySetInnerHTML: { __html },
        } ],
      })
    }
  }
}
