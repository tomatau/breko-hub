import { IndexLink, Link } from 'react-router'
import { routeActions } from 'react-router-redux'
import { connect } from 'react-redux'
import styles from './HeadNavigation.module.scss'

const RSRLink = ({ path, dispatch, ...props }) =>
  <a href={`${path}`}
    onClick={e => {
      e.preventDefault()
      dispatch(routeActions.push(path, false))
    }} {...props} />

@connect()
export default class HeadNavigation extends React.Component {
  render() {
    const { dispatch, ...props } = this.props
    return (
      <nav className='head-navigation' {...props}>
        <IndexLink activeClassName={styles.active} to='/'>
          Home
        </IndexLink>
        <Link activeClassName={styles.active} to='/foo'>
          Foo
        </Link>
        <RSRLink dispatch={dispatch} path='/bar'>
          Bar
        </RSRLink>
      </nav>
    )
  }
}
