import React from 'react'
import { Helmet as DocumentMeta } from 'react-helmet-async'
import { Switch, Route } from 'react-router-dom'
import { hot } from 'react-hot-loader/root'
import { app as appCopy } from 'app/copy'
import { routesList } from 'app/routes'

class App extends React.Component {
  render() {
    return (
      <>
        <DocumentMeta
          defaultTitle={`${appCopy.title}`}
          titleTemplate={`%s | ${appCopy.title}`}
        >
          <html lang='en' />
          <meta charSet='utf-8' />
          <meta name='description' content={appCopy.meta.description} />
          <meta name='keywords' content={appCopy.meta.keywords} />
          <meta
            name='viewport'
            content='width=device-width,initial-scale=1.0'
          />
        </DocumentMeta>
        <header>
          <h1>{appCopy.title}</h1>
        </header>
        <main aria-live='polite'>
          <Switch>
            {routesList.map(route => (
              <Route
                key={route.name}
                exact={route.exact}
                path={route.path}
                {...route.render
                  ? { render: route.render }
                  : { component: route.component }
                }
              />
            ))}
          </Switch>
        </main>
      </>
    )
  }
}

export default hot(App)
