import React from 'react'
import PropTypes from 'prop-types'
import { Router } from 'react-router-dom'
import { createMemoryHistory } from 'history'

class StaticRouter extends React.Component {
  static propTypes = {
    history: PropTypes.object,
  };

  static childContextTypes = {
    router: PropTypes.object.isRequired,
  };

  static defaultProps = {
    history: createMemoryHistory(),
  };

  getChildContext() {
    const { history } = this.props
    return {
      router: {
        staticContext: history,
      },
    }
  }

  render() {
    const { history, ...props } = this.props

    return <Router {...props} history={history} />
  }
}

export default StaticRouter
