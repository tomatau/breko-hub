import React from 'react'
import style from './App.module.scss'
import './App.css'
import img from '~/src/assets/avatar.jpeg'
import debug from 'debug'

debug('App.es6')('Customisable logging for both node and browser')
class App extends React.Component {
  render() {
    return (
      <main className={style.app}>
        <img src={img} alt='Me' />
        The App
      </main>
    )
  }
}

export default App
