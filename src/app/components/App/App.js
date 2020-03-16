import React from 'react'
import { Helmet as DocumentMeta } from 'react-helmet-async'
import { connect } from 'react-redux'
import { Switch, Route, withRouter } from 'react-router-dom'
import { hot } from 'react-hot-loader/root'
import { get } from 'app/utils'
import { addMessage } from 'app/modules/flash/flash.actions'
import { app as appCopy } from 'app/copy'
import { routesList } from 'app/routes'
import HeadNavigation from 'app/components/HeadNavigation/HeadNavigation'
import FlashMessages from 'app/components/@FlashMessages/FlashMessages'
import style from './App.module.scss'

const getLocationFlashState = get('state.flash', {})

@connect(null, { addMessage })
@withRouter
class App extends React.Component {
  componentDidMount() {
    this.addFlashFromLocation()
  }

  componentDidUpdate() {
    this.addFlashFromLocation()
  }

  addFlashFromLocation = () => {
    const { location, addMessage } = this.props
    const flashState = getLocationFlashState(location)
    if (flashState.message) {
      addMessage(flashState.message, flashState.type)
    }
  }

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
        <div className={style.app}>
          <HeadNavigation />
          <header>
            <h1>{appCopy.title}</h1>
          </header>
          <main
            aria-live='polite'
            className={style.content}
          >
            <FlashMessages />
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
        </div>
      </>
    )
  }
}

export default hot(App)
