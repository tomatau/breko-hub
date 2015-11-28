import React from 'react'
import { prefetch } from 'react-fetcher'
import debug from 'debug'
import HeadNavigation from '~/src/app/components/containers/HeadNavigation'
import style from './App.module.scss'
import img from '~/src/assets/avatar.jpeg'
import './App.css'
import { isBrowser } from '~/src/app/utils/predicates'

const log = {
  app: debug('App.es'),
}

const exampleActionCreator = () => ({
  type: 'EXAMPLE',
  payload: {
    example: isBrowser() ? 'data-from-browser' : 'data-from-server',
  },
})

@prefetch(({ store }) => {
  if (!store.getState().example.example) store.dispatch(exampleActionCreator())
})
class App extends React.Component {

  render() {
    log.app('render')
    return (
      <main className={style.app}>
        <HeadNavigation />
        <img src={img} alt='mee' width='70' style={{ float: 'right' }} />
        <h1>The App</h1>
        Page: { this.props.children }
      </main>
    )
  }
}

export default App
