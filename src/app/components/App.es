import React from 'react'
import { get } from 'lodash'
import HeadNavigation from '~/src/app/components/containers/HeadNavigation'
import { reduxLoadProps } from '~/src/app/actions'
import debug from 'debug'
import style from './App.module.scss'
import img from '~/src/assets/avatar.jpeg'
import './App.css'
import { isBrowser } from '~/src/app/utils/predicates'

debug('App.es')('Customisable logging for both node and browser')

const creator = () => ({
  type: 'EXAMPLE',
  payload: {
    example: isBrowser() ? 'data-from-browser' : 'data-from-server',
  },
})

class App extends React.Component {

  static loadProps = reduxLoadProps([ creator() ], state => ({
    example: get(state, 'example.example'),
  }));

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
