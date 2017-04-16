import React from 'react'
import { hasWindow } from 'app/utils'
import PropTypes from 'prop-types'

export default class CodeSplit extends React.Component {
  static propTypes = {
    load: PropTypes.func,
  };

  state = {
    mod: null,
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
    this.setState({ mod: null })
    load().then(mod => {
      this.setState({ mod })
    })
  }

  render() {
    return this.props.children(this.state.mod)
  }
}
