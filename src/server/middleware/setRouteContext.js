import React from 'react'
import { RoutingContext, match } from 'react-router'
import { getPrefetchedData } from 'react-fetcher'
import { store } from 'app/state/store'
import { history } from 'app/state/history'

export default function(makeRoutes) {
  return function *(next) {
    let routing = { // can't make this const?
      routes: makeRoutes(),
      location: history.createLocation(this.request.url),
    }
    this.routeContext = yield new Promise(resolve => {
      match(routing, async (error, redirect, renderProps) => {
        if (redirect)
          return this.redirect(redirect.pathname + redirect.search)
        else if (error)
          return this.throw(error.message)
        else if (renderProps == null)
          return this.throw(404, 'Not found')
        await getPrefetchedData(renderProps.components, {
          store,
          location: renderProps.location,
          params: renderProps.params,
        })
        resolve(<RoutingContext {...renderProps} />)
      })
    })
    yield next
  }
}
