import ReactDOMServer from 'react-dom/server'
import { RouterContext, match } from 'react-router'
import { trigger } from 'redial'
import { Provider } from 'react-redux'
import { isEnv } from 'app/utils'
import { makeHtml } from 'server/utils'

export default function(routes, assets) {
  return function *renderReactApp() {
    try {
      const routeContext = yield getRouteContext(this, routes)

      const contentArray = [
        {
          id: 'app-container',
          dangerouslySetInnerHTML: {
            __html: ReactDOMServer.renderToString(
              <Provider store={this.store}>
                {routeContext}
              </Provider>
            ),
          },
        },
        isEnv('development') && { id: 'debug-panel-container' },
      ]

      assets.stringScripts.push(
        `window.__INITIAL_STATE__ = ${
          JSON.stringify(this.store.getState(), null, 2)
        };`
      )

      this.response.body = makeHtml(assets, contentArray)
    } catch (error) {
      if (error instanceof Error) throw error
    }
  }
}

const getRouteContext = (ctx, routes) =>
  new Promise((resolve, reject) => {
    match({
      routes, location: ctx.request.url,
    }, async (error, redirect, renderProps) => {
      if (error) {
        ctx.status = 500
        reject(ctx.throw(error))

      } else if (redirect) {
        ctx.status = 302
        reject(ctx.redirect(`${redirect.pathname}${redirect.search}`))

      } else if (!renderProps) {
        ctx.status = 404
        reject()

      } else {
        await trigger('prefetch', renderProps.components, {
          dispatch: ctx.store.dispatch,
          location: renderProps.location,
          params: renderProps.params,
        })
        resolve(<RouterContext {...renderProps} />)
      }
    })
  })
