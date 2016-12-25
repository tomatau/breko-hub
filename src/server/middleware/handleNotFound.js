import ReactDOMServer from 'react-dom/server'
import { Provider } from 'react-redux'
import App from 'app/components/App/App'
import NotFoundRoute from 'app/routes/NotFoundRoute'
import { makeHtml } from 'server/utils'

const log = debug('handle-not-found')

export default function(assets) {
  return function *handleNotFound(next) {
    yield next
    if (this.response.status === 404) {
      /*
        this is a back-up in-case their is no react route handling '*'
        or the API can't handle the route
       */
      log('route not found!')
      if (this.accepts([ 'json', 'html' ]) === 'json') {
        this.response.body = { error: 'Not found' }
      } else {
        const contentArray = [
          {
            id: 'app-container',
            dangerouslySetInnerHTML: {
              __html: ReactDOMServer.renderToString(
                <Provider store={this.store}>
                  <App>
                    <NotFoundRoute />
                  </App>
                </Provider>
              ),
            },
          },
        ]

        this.response.body = makeHtml({
          ...assets,
          stringScripts: [
            `window.__INITIAL_STATE__ = ${
              JSON.stringify(this.store.getState(), null, 2)
            };`,
          ],
        }, contentArray)
      }
    }
  }
}
