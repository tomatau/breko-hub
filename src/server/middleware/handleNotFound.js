import { STATUS_CODES } from 'http'
import ReactDOMServer from 'react-dom/server'
import { Provider } from 'react-redux'
import App from 'app/components/App/App'
import NotFoundRoute from 'app/routes/NotFoundRoute'
import { makeHtml } from 'server/utils'

const log = debug('handle-not-found')

export default function(assets) {
  return async function handleNotFound(ctx, next) {
    await next()
    const { status } = ctx.response
    if (status === 404) {
      /*
        ctx is a back-up in-case their is no react route handling '*'
        or the API can't handle the route
       */
      log('route not found!')
      if (ctx.accepts([ 'json', 'html' ]) === 'json') {
        ctx.response.body = { error: STATUS_CODES[status] }
      } else {
        const contentArray = [
          {
            id: 'app-container',
            dangerouslySetInnerHTML: {
              __html: ReactDOMServer.renderToString(
                <Provider store={ctx.store}>
                  <App>
                    <NotFoundRoute />
                  </App>
                </Provider>
              ),
            },
          },
        ]

        ctx.response.body = makeHtml({
          ...assets,
          stringScripts: [
            `window.__INITIAL_STATE__ = ${
              JSON.stringify(ctx.store.getState(), null, 2)
            };`,
          ],
        }, contentArray)
      }
    }
  }
}
