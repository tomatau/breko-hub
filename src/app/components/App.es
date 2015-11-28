import React from 'react'
import debug from 'debug'
import HeadNavigation from '~/src/app/components/containers/HeadNavigation'
import style from './App.module.scss'
import img from '~/src/assets/avatar.jpeg'
import './App.css'

const log = {
  app: debug('App.es'),
}

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
