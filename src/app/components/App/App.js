import DocumentMeta from 'react-helmet'
import { Switch, Route } from 'react-router-dom'
import Loadable from 'react-loadable'
import HeadNavigation from 'app/components/HeadNavigation/HeadNavigation'
import FlashMessages from 'app/components/@FlashMessages/FlashMessages'
import PrivateRoute from 'app/routes/PrivateRoute/PrivateRoute'
import avatarPath from 'assets/avatar.jpeg'
import style from './App.module.scss'

const log = debug('App.js')

const Loading = ({ pastDelay }) => (
  pastDelay ? <div>Loading...</div> : null
)

const LoadableHomeRoute = Loadable({
  loader: () => import('../../routes/HomeRoute/HomeRoute'),
  loading: Loading,
  webpack: () => [ require.resolveWeak('../../routes/HomeRoute/HomeRoute') ],
  modules: [ '../../routes/HomeRoute/HomeRoute' ],
})

const LoadableBarRoute = Loadable({
  loader: () => import('../../routes/BarRoute/BarRoute'),
  loading: Loading,
  webpack: () => [ require.resolveWeak('../../routes/BarRoute/BarRoute') ],
  modules: [ '../../routes/BarRoute/BarRoute' ],
})

const LoadableOopsRoute = Loadable({
  loader: () => import('../../routes/OopsRoute/OopsRoute'),
  loading: Loading,
  webpack: () => [ require.resolveWeak('../../routes/OopsRoute/OopsRoute') ],
  modules: [ '../../routes/OopsRoute/OopsRoute' ],
})

const LoadableNotFoundRoute = Loadable({
  loader: () => import('../../routes/NotFoundRoute/NotFoundRoute'),
  loading: Loading,
  webpack: () => [ require.resolveWeak('../../routes/NotFoundRoute/NotFoundRoute') ],
  modules: [ '../../routes/NotFoundRoute/NotFoundRoute' ],
})

export default class App extends React.Component {
  render() {
    log('render')
    return (
      <div className={style.app}>
        <DocumentMeta
          defaultTitle='Breko Hub'
          titleTemplate='%s | Breko Hub'>
          <html lang='en' />
          <meta charSet='utf-8' />
          <meta name='viewport' content='width=device-width,initial-scale=1.0' />
          <meta name='description' content='Breko Hub, a minimal boilerplate for building universal react applications' />
          <meta name='keywords' content='react,redux,react-router,koa,universal,babel,es7,hmr,webpack' />
        </DocumentMeta>
        <HeadNavigation />
        <FlashMessages />
        <img
          src={avatarPath}
          alt='me'
          width='70'
        />
        <h1>Breko Hub</h1>
        <main className={style.content}>
          <Switch>
            <Route
              exact
              path='/'
              component={LoadableHomeRoute}
            />
            <Route
              path='/bar'
              component={LoadableBarRoute}
            />
            <Route
              path='/oops'
              component={LoadableOopsRoute}
            />
            <Route
              path='/private'
              // no dynamic import when server side redirect
              component={PrivateRoute}
            />
            <Route
              component={LoadableNotFoundRoute}
            />
          </Switch>
        </main>
      </div>
    )
  }
}
