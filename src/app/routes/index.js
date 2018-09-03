import Loadable from 'react-loadable'
import { app as appCopy } from 'app/copy'
import { addKeyAsProperty } from 'app/utils'
import PrivateRoute from 'app/routes/PrivateRoute/PrivateRoute'

const Loading = ({ pastDelay }) => (
  pastDelay ? <h2>{appCopy.loading}</h2> : null
)

export const routesMap = addKeyAsProperty('name')({
  home: {
    exact: true,
    path: '/',
    component: Loadable({
      loader: () => import('./HomeRoute/HomeRoute'),
      loading: Loading,
      webpack: () => [ require.resolveWeak('./HomeRoute/HomeRoute') ],
      modules: [ './HomeRoute/HomeRoute' ],
    }),
  },
  bar: {
    path: '/bar',
    component: Loadable({
      loader: () => import('./BarRoute/BarRoute'),
      loading: Loading,
      webpack: () => [ require.resolveWeak('./BarRoute/BarRoute') ],
      modules: [ './BarRoute/BarRoute' ],
    }),
  },
  oops: {
    path: '/oops',
    component: Loadable({
      loader: () => import('./OopsRoute/OopsRoute'),
      loading: Loading,
      webpack: () => [ require.resolveWeak('./OopsRoute/OopsRoute') ],
      modules: [ './OopsRoute/OopsRoute' ],
    }),
  },
  private: {
    path: '/private',
    component: PrivateRoute,
  },
  notFound: {
    component: Loadable({
      loader: () => import('./NotFoundRoute/NotFoundRoute'),
      loading: Loading,
      webpack: () => [ require.resolveWeak('./NotFoundRoute/NotFoundRoute') ],
      modules: [ './NotFoundRoute/NotFoundRoute' ],
    }),
  },
})

export const routesList = Object.values(routesMap)
