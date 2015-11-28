import React from 'react'
import { IndexLink, Link as RRLink } from 'react-router'
import { updatePath } from 'redux-simple-router'
import { connect } from 'react-redux'

const RSRLink = ({ dispatch, path, ...props }) =>
  <a href={`${path}`}
    onClick={e => { e.preventDefault(); dispatch(updatePath(path)) }}
    {...props} />

@connect()
class HeadNavigation extends React.Component {
  render() {
    return (
      <div>
        <IndexLink to='/'>
          Home
        </IndexLink>
        &nbsp;|&nbsp;
        <RRLink to='/foo'>
          Foo
        </RRLink>
        &nbsp;|&nbsp;
        <RSRLink dispatch={this.props.dispatch} path='/bar'>
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
