import { RouterContext, match } from 'react-router'
import { trigger } from 'redial'
import { history } from 'app/services/history'
import * as selectors from 'app/selectors'
import { store as clientStore } from 'app/services/store'

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
            transferFlashMessages.call(this)
            return reject(this.redirect(`${redirect.pathname}${redirect.search}`))
          } else if (!renderProps) {
            this.status = 404
            return resolve(<p>Not found</p>)
          } else if (error) {
            return reject(this.throw(error.message))
          }

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

    function transferFlashMessages() {
      const nextFlashMessage = selectors.nextFlashMessage(clientStore.getState())
      if (nextFlashMessage) {
        this.addFlash(nextFlashMessage.message, nextFlashMessage.type)
      }
    }
  }
}
