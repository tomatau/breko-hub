import loadable from '@loadable/component'
import { addKeyAsProperty } from 'app/utils'

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
    component: loadable(() => import('./PrivateRoute/PrivateRoute')),
  },
  notFound: {
    component: loadable(() => import('./NotFoundRoute/NotFoundRoute')),
  },
})

export const routesList = Object.values(routesMap)
