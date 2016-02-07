import { RoutingContext, match } from 'react-router'
import { trigger } from 'redial'
import { history } from 'app/state/history'

export default function(makeRoutes) {
  return function *(next) {
    try {
      const { store } = this
      this.routeContext = yield new Promise((resolve, reject) => {
        match({
          routes: makeRoutes(),
          location: history.createLocation(this.request.url),
        }, (error, redirect, renderProps) => {
          if (redirect)
            return reject(this.redirect(redirect.pathname + redirect.search))
          else if (error)
            return reject(this.throw(error.message))
          else if (renderProps == null)
            return reject(this.throw(404, 'Not found'))
          trigger('prefetch', renderProps.components, {
            store,
            location: renderProps.location,
            params: renderProps.params,
          }).then(() =>
            resolve(<RoutingContext {...renderProps} />)
          )
        })
      })
      yield next
    } catch (error) {
      if (error == null) return // redirecting
      throw error
    }
  }
}
