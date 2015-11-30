import React from 'react'
import { IndexLink, Link } from 'react-router'
import { updatePath } from 'redux-simple-router'
import { store } from '~/src/app/state/store'
import styles from './HeadNavigation.module.scss'

const RSRLink = ({ path, ...props }) =>
  <a href={`${path}`}
    onClick={e => {
      e.preventDefault()
      store.dispatch(updatePath(path, false))
    }} {...props} />

class HeadNavigation extends React.Component {

  render() {
    return (
      <div>
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
      </div>
    )
  }

  clickLink(e) {
    e.preventDefault()
  }
}

export default HeadNavigation
