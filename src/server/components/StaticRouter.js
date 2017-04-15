import PropTypes from 'prop-types'
import { Router } from 'react-router-dom'
import createStaticHistory from 'server/utils/createStaticHistory'

class StaticRouter extends React.Component {
  static propTypes = {
    history: PropTypes.object,
  }

  static defaultProps = {
    history: createStaticHistory(),
  }

  static childContextTypes = {
    router: PropTypes.object.isRequired,
  }

  getChildContext() {
    return {
      router: {
        staticContext: this.props.history.context,
      },
    }
  }

  render() {
    const { history, ...props } = this.props

    return <Router {...props} history={history}/>
  }
}

export default StaticRouter
