import React from 'react'
import HeadNavigation from '~/src/app/components/containers/HeadNavigation'
import style from './App.module.scss'
import './App.css'
import img from '~/src/assets/avatar.jpeg'
import debug from 'debug'
import { reduxLoadProps } from '~/src/app/actions'

debug('App.es')('Customisable logging for both node and browser')

const creator = () => ({
  type: 'EXAMPLE',
  payload: {
    example: 'data',
  },
})

class App extends React.Component {

  static loadProps(params, cb) {
    reduxLoadProps(creator(), state => {
      cb(null, state.example)
    })
  }

  render() {
    return (
      <main className={style.app}>
        <HeadNavigation />
        <img src={img} alt='mee' width='70' style={{ float: 'right' }} />
        <h1>The App</h1>
        Page: { this.props.children || 'index' }
      </main>
    )
  }
}

export default App
