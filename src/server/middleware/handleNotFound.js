import ReactDOMServer from 'react-dom/server'
import { Provider } from 'react-redux'
import App from 'app/components/App/App'
import NotFoundRoute from 'app/routes/NotFoundRoute'
import { makeHtml } from 'server/utils'

export default function(headStyles) {
  return function *handleNotFound(next) {
    yield next
    if (this.response.status === 404) {
      const notFoundProps = {
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
      }

      this.response.body = makeHtml(
        {
          headStyles,
          stringScripts: [
            `window.__INITIAL_STATE__ = ${
              JSON.stringify(this.store.getState(), null, 2)
            };`,
          ],
        },
        [ notFoundProps ]
      )
    }
  }
}
