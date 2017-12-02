import cx from 'classnames'
import { NavLink } from 'react-router-dom'
import styles from './HeadNavigation.module.scss'

// Putting this inside a connect will break activeClassName
// unless you also subscribe to changes to routing state or context
export default class HeadNavigation extends React.Component {
  render() {
    const { className, ...props } = this.props
    return (
      <nav className={cx(styles.nav, className)} {...props}>
        <NavLink
          exact
          activeClassName={styles.active}
          to='/'>
          Home
        </NavLink>
        <NavLink activeClassName={styles.active} to='/bar'>
          Bar
        </NavLink>
        <NavLink activeClassName={styles.active} to='/private'>
          Private
        </NavLink>
      </nav>
    )
  }
}
