import React from 'react'
import DocumentMeta from 'react-helmet'
import { Switch, Route } from 'react-router-dom'
import { hot } from 'react-hot-loader'
import { app as appCopy } from 'app/copy'
import { routesList } from 'app/routes'
import HeadNavigation from 'app/components/HeadNavigation/HeadNavigation'
import FlashMessages from 'app/components/@FlashMessages/FlashMessages'
import avatarPath from 'assets/avatar.jpeg'
import style from './App.module.scss'

const log = debug('App.js')

class App extends React.Component {
  render() {
    log('render')
    return (
      <div className={style.app}>
        <DocumentMeta
          defaultTitle={`${appCopy.title}`}
          titleTemplate={`%s | ${appCopy.title}`}
        >
          <html lang='en' />
          <meta charSet='utf-8' />
          <meta name='viewport' content='width=device-width,initial-scale=1.0' />
          <meta name='description' content={appCopy.meta.description} />
          <meta name='keywords' content={appCopy.meta.keywords} />
        </DocumentMeta>
        <HeadNavigation />
        <FlashMessages />
        <img
          src={avatarPath}
          alt='me'
          width='70'
        />
        <header role='banner'>
          <h1>{appCopy.title}</h1>
        </header>
        <main
          role='main'
          aria-live='polite'
          className={style.content}
        >
          <Switch>
            {routesList.map(route => (
              <Route
                key={route.name}
                exact={route.exact}
                path={route.path}
                component={route.component}
              />
            ))}
          </Switch>
        </main>
      </div>
    )
  }
}

export default hot(module)(App)
