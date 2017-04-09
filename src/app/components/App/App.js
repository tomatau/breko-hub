import DocumentMeta from 'react-helmet'
import { Switch, Route } from 'react-router'
import BarRoute from 'app/routes/BarRoute/BarRoute'
import OopsRoute from 'app/routes/OopsRoute/OopsRoute'
import PrivateRoute from 'app/routes/PrivateRoute/PrivateRoute'
import NotFoundRoute from 'app/routes/NotFoundRoute/NotFoundRoute'
import HomeRoute from 'app/routes/HomeRoute/HomeRoute'
import HeadNavigation from 'app/components/HeadNavigation/HeadNavigation'
import FlashMessages from 'app/components/@FlashMessages/FlashMessages'
// example image import
import avatarPath from 'assets/avatar.jpeg'
// example s?css module import
import style from './App.module.scss'

const log = debug('App.js')

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
        <img src={avatarPath} alt='me' width='70' />
        <h1>Breko Hub</h1>
        <main className={style.content}>
          <Switch>
            <Route exact path='/' component={HomeRoute} />
            <Route path='/bar' component={BarRoute} />
            <Route path='/private' component={PrivateRoute} />
            <Route path='/oops' component={OopsRoute} />
            <Route component={NotFoundRoute} />
          </Switch>
        </main>
      </div>
    )
  }
}
