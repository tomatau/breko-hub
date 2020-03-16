import React from 'react'
import { Redirect } from 'react-router'
import loadable from '@loadable/component'
import { addKeyAsProperty } from 'app/utils'
import { privateRoute as privateRouteCopy } from 'app/copy'
import { TYPES } from 'app/modules/flash/flash.constants'

function RequireAuthRoute() {
  return (
    <Redirect
      from='/private'
      to={{
        pathname: '/',
        state: {
          flash: { message: privateRouteCopy.flashMessage, type: TYPES.error },
        },
      }}
    />
  )
}

const LoadablePrivate = loadable(() => import('./PrivateRoute/PrivateRoute'))

export const routesMap = addKeyAsProperty('name')({
  home: {
    exact: true,
    path: '/',
    component: loadable(() => import('./HomeRoute/HomeRoute')),
  },
  bar: {
    path: '/bar',
    component: loadable(() => import('./BarRoute/BarRoute')),
  },
  oops: {
    path: '/oops',
    component: loadable(() => import('./OopsRoute/OopsRoute')),
  },
  private: {
    path: '/private',
    render: () => (
      <RequireAuthRoute>
        <LoadablePrivate />
      </RequireAuthRoute>
    ),
  },
  notFound: {
    component: loadable(() => import('./NotFoundRoute/NotFoundRoute')),
  },
})

export const routesList = Object.values(routesMap)
