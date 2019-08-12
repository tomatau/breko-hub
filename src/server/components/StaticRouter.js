import React from 'react'
import PropTypes from 'prop-types'
import { Router } from 'react-router-dom'
import { createMemoryHistory } from 'history'

class StaticRouter extends React.Component {
  static propTypes = {
    history: PropTypes.object,
  };

  static defaultProps = {
    history: createMemoryHistory(),
  };

  render() {
    const { history, ...props } = this.props

    return (
      <Router
        {...props}
        history={history}
        staticContext={history}
      />
    )
  }
}

export default StaticRouter
