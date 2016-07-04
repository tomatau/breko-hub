import DocumentMeta from 'react-document-meta'
import HeadNavigation from 'app/components/HeadNavigation'
import FlashMessages from 'app/components/containers/FlashMessages'
// example image import
import avatarPath from 'assets/avatar.jpeg'
// example s?css module import
import style from './App.module.scss'
// example s?css import (no module)
import './App.css'

const log = debug('App.js')

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
    log('render')
    return (
      <div className={style.app}>
        <DocumentMeta {...metaData} />
        <HeadNavigation />
        <FlashMessages />
        <img src={avatarPath} alt='me' width='70' />
        <h1>Breko Hub</h1>
        <main className={style.content}>
          {children}
        </main>
      </div>
    )
  }
}

export default App
