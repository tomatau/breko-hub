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
      <nav
        className={cx('HeadNavigation', styles.nav, className)}
        {...cleanProps(props)}
      >
        <NavLink
          exact
          to='/'
          activeClassName={styles.active}
        >
          {navCopy.home}
        </NavLink>
        <NavLink to='/bar' activeClassName={styles.active}>
          {navCopy.bar}
        </NavLink>
        <NavLink to='/private' activeClassName={styles.active}>
          {navCopy.private}
        </NavLink>
      </nav>
    )
  }
})
