import React from 'react'
import cx from 'classnames'
import { NavLink, withRouter } from 'react-router-dom'
import { nav as navCopy } from 'app/copy'
import { cleanProps } from 'app/utils'
import styles from './HeadNavigation.module.scss'

export default withRouter(class HeadNavigation extends React.Component {
  render() {
    const { className, ...props } = this.props
    return (
      <nav className={cx(styles.nav, className)} {...cleanProps(props)}>
        <NavLink
          exact
          activeClassName={styles.active}
          to='/'
        >
          {navCopy.home}
        </NavLink>
        <NavLink activeClassName={styles.active} to='/bar'>
          {navCopy.bar}
        </NavLink>
        <NavLink activeClassName={styles.active} to='/private'>
          {navCopy.private}
        </NavLink>
      </nav>
    )
  }
})
