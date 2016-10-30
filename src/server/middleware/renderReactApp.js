import { RouterContext, match } from 'react-router'
import { trigger } from 'redial'
import { Provider } from 'react-redux'
import { makeHtml } from 'server/utils'
const log = debug('render-route-context')

export default function(routes, assets) {
  return function *renderReactApp() {
    try {
      const routeContext = yield getRouteContext(this, routes)

      log('setting body')
      this.response.body = makeHtml(
        this.store.getState(),
        assets,
        <Provider store={this.store}>
          {routeContext}
        </Provider>
      )
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
