import { RouterContext, match } from 'react-router'
import { trigger } from 'redial'
import { history } from 'app/services/history'

export default function(makeRoutes) {
  return function *(next) {
    try {
      const { store } = this
      this.routeContext = yield new Promise((resolve, reject) => {
        match({
          routes: makeRoutes(),
          location: history.createLocation(this.request.url),
        }, (error, redirect, renderProps) => {
          if (redirect) {
            // todo: figure out how to persist client redirect state on server render
            this.addFlash('You may not view the private route!!', 'error')
            return reject(this.redirect(redirect.pathname + redirect.search))
          } else if (error)
            return reject(this.throw(error.message))

          trigger('prefetch', renderProps.components, {
            dispatch: store.dispatch,
            location: renderProps.location,
            params: renderProps.params,
          }).then(() =>
            resolve(<RouterContext {...renderProps} />)
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
