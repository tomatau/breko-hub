import React from 'react'
import { hasWindow, noop } from 'app/utils'
import PropTypes from 'prop-types'

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
    if (hasWindow) this.callLoad(this.props.load)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.load !== this.props.load) {
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
