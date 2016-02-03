import React from 'react'
import { IndexLink, Link } from 'react-router'
import { routeActions } from 'react-router-redux'
import { store } from 'app/state/store'
import styles from './HeadNavigation.module.scss'

const RSRLink = ({ path, ...props }) =>
  <a href={`${path}`}
    onClick={e => {
      e.preventDefault()
      store.dispatch(routeActions.push(path, false))
    }} {...props} />

class HeadNavigation extends React.Component {

  render() {
    return (
      <nav>
        <IndexLink activeClassName={styles.active} to='/'>
          Home
        </IndexLink>
        &nbsp;|&nbsp;
        <Link activeClassName={styles.active} to='/foo'>
          Foo
        </Link>
        &nbsp;|&nbsp;
        <RSRLink path='/bar'>
          Bar
        </RSRLink>
      </nav>
    )
  }

  clickLink(e) {
    e.preventDefault()
  }
}

export default HeadNavigation
