import DocumentMeta from 'react-document-meta'
import HeadNavigation from 'app/components/HeadNavigation'
import FlashMessages from 'app/components/containers/FlashMessages'
// example image import
import img from 'assets/avatar.jpeg'
// example s?css module import
import style from './App.module.scss'
// example s?css import (no module)
import './App.css'

const log = {
  app: debug('App.es'),
}

const metaData = {
  title: 'Breko Hub',
  description: 'Breko Hub, a minimal boilerplate'
    + 'for building universal react applications',
  meta: {
    charSet: 'utf-8',
    name: {
      keywords: 'react,redux,react-router,koa,universal,babel,es7,hmr,webpack',
    },
  },
}

class App extends React.Component {
  render() {
    const { children } = this.props
    log.app('render')
    return (
      <main className={style.app}>
        <DocumentMeta {...metaData} />
        <HeadNavigation />
        <FlashMessages />
        <img src={img} alt='me' width='70' />
        <h1>Breko Hub</h1>
        <div>
          {children}
        </div>
      </main>
    )
  }
}

export default App
