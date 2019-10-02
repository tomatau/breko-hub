import loadable from '@loadable/component'
import { addKeyAsProperty } from 'app/utils'

export const routesMap = addKeyAsProperty('name')({
  home: {
    exact: true,
    path: '/',
    component: loadable(() => import('./HomeRoute/HomeRoute')),
  },
  oops: {
    path: '/oops',
    component: loadable(() => import('./OopsRoute/OopsRoute')),
  },
  notFound: {
    component: loadable(() => import('./NotFoundRoute/NotFoundRoute')),
  },
})

export const routesList = Object.values(routesMap)
