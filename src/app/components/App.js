import React from 'react'
import DocumentMeta from 'react-document-meta'
import debug from 'debug'
import HeadNavigation from 'app/components/containers/HeadNavigation'
import img from 'assets/avatar.jpeg'
import style from './App.module.scss'
import './App.css'

const log = {
  app: debug('App.es'),
}

const metaData = {
  title: 'Breko Hub',
  description: 'Breko Hub, a minimal boilerplate for building universal react applications',
  meta: {
    charSet: 'utf-8',
    name: {
      keywords: 'react,redux,react-router,koa,universal,babel,es7,hmr,webpack',
    },
  },
}

class App extends React.Component {

  render() {
    log.app('render')
    return (
      <main className={style.app}>
        <DocumentMeta {...metaData} />
        <HeadNavigation />
        <img src={img} alt='me' width='70' />
        <h1>The App</h1>
        Page: {this.props.children}
      </main>
    )
  }
}

export default App
