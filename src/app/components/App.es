import React from 'react'
import HeadNavigation from '~/src/app/components/containers/HeadNavigation'
import style from './App.module.scss'
import './App.css'
import img from '~/src/assets/avatar.jpeg'
import debug from 'debug'

debug('App.es')('Customisable logging for both node and browser')

class App extends React.Component {
  render() {
    return (
      <main className={style.app}>
        <HeadNavigation />
        <img src={img} alt='me' width="70" style={{ float: 'right' }} />
        <h1>The App</h1>
        Page: { this.props.children || 'index' }
      </main>
    )
  }
}

export default App
