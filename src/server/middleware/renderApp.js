import ReactDOMServer from 'react-dom/server'
import { Provider } from 'react-redux'
import { LOCATION_CHANGE } from 'react-router-redux'
import { compact, isOneOf } from 'app/utils'
import makeHtmlBody from 'server/utils/makeHtmlBody'
import StaticRouter from 'server/components/StaticRouter'
import app from 'app'

const log = debug('renderApp')
const isClientRedirect = isOneOf([ 'PUSH', 'REPLACE' ])

export default function (assets) {
  return function renderApp(ctx) {
    ctx.store.dispatch({
      type: LOCATION_CHANGE,
      payload: ctx.history.location,
    })
    const html = ReactDOMServer.renderToString(
      <Provider store={ctx.store}>
        <StaticRouter history={ctx.history}>
          {app.createAppInstance()}
        </StaticRouter>
      </Provider>
    )
    if (isClientRedirect(ctx.history.action)) {
      log('302 redirect to', ctx.history.location.pathname)
      ctx.status = 302
      ctx.redirect(ctx.history.location.pathname)
    } else {
      log('setting html response body')
      ctx.response.body = makeHtmlBody({
        headScripts: compact([ assets.javascript.head ]),
        headStyles: compact([ assets.styles.body, assets.styles.head ]),
        bodyScripts: compact([ assets.javascript.body ]),
        stringScripts: [
          `window.__INITIAL_STATE__ = ${
            JSON.stringify(ctx.store.getState(), null, 2)
          };`,
        ],
        content: [
          { id: 'app-container', dangerouslySetInnerHTML: { __html: html } },
        ],
      })
    }
  }
}
