import React from 'react'
import createLocation from 'history/lib/createLocation'
import { RoutingContext, match } from 'react-router'

export default function(makeRoutes) {
  return function *(next) {
    const routes = makeRoutes()
    const location = createLocation(this.request.url)
    match({ routes, location }, (error, redirect, renderProps) => {
      if (redirect)
        return this.redirect(redirect.pathname + redirect.search)
      else if (error)
        return this.throw(error.message)
      else if (renderProps == null)
        return this.throw(404, 'Not found')
      else
        this.routeContext = <RoutingContext {...renderProps} />
    })
    yield next
  }
}
