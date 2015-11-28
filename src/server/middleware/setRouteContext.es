import React from 'react'
import { RoutingContext, match } from 'react-router'
import { getPrefetchedData } from 'react-fetcher'
import { store } from '~/src/app/state/store'
import { history } from '~/src/app/state/history'

export default function(makeRoutes) {
  return function *(next) {
    const routes = makeRoutes()
    const location = history.createLocation(this.request.url)
    yield new Promise(resolve => {
      match({ routes, location }, async (error, redirect, renderProps) => {
        if (redirect)
          return this.redirect(redirect.pathname + redirect.search)
        else if (error)
          return this.throw(error.message)
        else if (renderProps == null)
          return this.throw(404, 'Not found')
        const locals = {
          store,
          location: renderProps.location,
          params: renderProps.params,
        }
        await getPrefetchedData(renderProps.components, locals)
        this.routeContext = <RoutingContext {...renderProps} />
        resolve()
      })
    })
    yield next
  }
}
