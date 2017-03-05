import ReactDOMServer from 'react-dom/server'
import { RouterContext, match } from 'react-router'
import { trigger } from 'redial'
import { Provider } from 'react-redux'
import { isEnv } from 'app/utils'
import { makeHtml } from 'server/utils'

const log = debug('render-react-app')

export default function(routes, assets) {
  return async function renderReactApp(ctx) {
    try {
      const routeContext = await getRouteContext(ctx, routes)

      const contentArray = [
        {
          id: 'app-container',
          dangerouslySetInnerHTML: {
            __html: ReactDOMServer.renderToString(
              <Provider store={ctx.store}>
                {routeContext}
              </Provider>
            ),
          },
        },
        isEnv('development') && { id: 'debug-panel-container' },
      ]

      assets.stringScripts.push(
        `window.__INITIAL_STATE__ = ${
          JSON.stringify(ctx.store.getState(), null, 2)
        };`
      )

      log('rendering react app')
      ctx.response.body = makeHtml(assets, contentArray)
    } catch (error) {
      log(error)
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
