import ReactDOMServer from 'react-dom/server'
import { LOCATION_CHANGE } from 'react-router-redux'
import { CONTAINER_ELEMENT_ID } from 'config/constants'
import { compact, isOneOf, get } from 'app/utils'
import makeHtmlBody from 'server/utils/make-html-body'
import StaticRouter from 'server/components/StaticRouter'
import * as app from 'app/main'

const log = debug('render-app')
const isClientRedirect = isOneOf([ 'PUSH', 'REPLACE' ])
const getJavascripts = get('javascript', {})
const getStyles = get('styles', {})

export default function (assets) {
  const javascripts = getJavascripts(assets)
  const styles = getStyles(assets)

  return function renderApp(ctx) {
    ctx.store.dispatch({
      type: LOCATION_CHANGE,
      payload: ctx.history.location,
    })
    const __html = ReactDOMServer.renderToString(
      app.Main(ctx.store, ctx.history, StaticRouter)
    )

    if (isClientRedirect(ctx.history.action)) {
      log('302 redirect to', ctx.history.location.pathname)
      ctx.status = 302
      ctx.redirect(ctx.history.location.pathname)
    } else {
      log('setting html response body')
      ctx.response.body = makeHtmlBody({
        headScripts: compact([ javascripts.head ]),
        headStyles: compact([ styles.body, styles.head ]),
        bodyScripts: compact([ javascripts.body ]),
        stringScripts: [
          `window.__INITIAL_STATE__ = ${
            JSON.stringify(ctx.store.getState(), null, 2)
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
