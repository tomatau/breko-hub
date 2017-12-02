import React from 'react'
import PropTypes from 'prop-types'
import { hasWindow, noop } from 'app/utils'

export default class CodeSplit extends React.Component {
  static propTypes = {
    load: PropTypes.func,
    children: PropTypes.func,
  };

  static defaultProps = {
    load: noop,
    children: noop,
  };

  state = {
    module: null,
  };

  componentWillMount() {
    const { load } = this.props
    if (hasWindow) this.callLoad(load)
  }

  componentWillReceiveProps(nextProps) {
    const { load } = this.props
    if (nextProps.load !== load) {
      this.callLoad(nextProps.load)
    }
  }

  callLoad(load) {
    this.setState({ module: null })
    load().then(module => {
      this.setState({ module })
    })
  }

  render() {
    const { children } = this.props
    const { module } = this.state
    return children(module)
  }
}
