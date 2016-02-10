import { IndexLink, Link } from 'react-router'
import styles from './HeadNavigation.module.scss'

export default class HeadNavigation extends React.Component {
  render() {
    const { ...props } = this.props
    return (
      <nav className={styles.nav} {...props}>
        <IndexLink activeClassName={styles.active} to='/'>
          Home
        </IndexLink>
        <Link activeClassName={styles.active} to='/foo'>
          Foo
        </Link>
        <Link activeClassName={styles.active} to='/bar'>
          Bar
        </Link>
      </nav>
    )
  }
}
