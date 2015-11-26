import React from 'react'
import createLocation from 'history/lib/createLocation'
import { match } from 'react-router'
import AsyncProps, { loadPropsOnServer } from 'async-props'

export default function(makeRoutes) {
  return function *(next) {
    const routes = makeRoutes()
    const location = createLocation(this.request.url)
    yield new Promise(resolve => {
      match({ routes, location }, (error, redirect, renderProps) => {
        if (redirect)
          return this.redirect(redirect.pathname + redirect.search)
        else if (error)
          return this.throw(error.message)
        else if (renderProps == null)
          return this.throw(404, 'Not found')
        else
          loadPropsOnServer(renderProps, (err, asyncProps) => {
            this.asyncPropsState = asyncProps.propsArray.reduce((acc, v)=>
              ({ ...acc, ...v }), {}
            )
            this.routeContext = <AsyncProps {...renderProps} {...asyncProps}/>
            resolve()
          })
      })
    })
    yield next
  }
}
