import { connect } from 'react-redux'
import { replace } from 'react-router-redux'
import { hot } from 'react-hot-loader'
import { privateRoute } from 'app/copy'
import { addMessage } from 'app/modules/flash/flash.actions'

@connect(null, { replace, addMessage })
class PrivateRoute extends React.Component {
  componentWillMount() {
    const { addMessage, replace } = this.props
    addMessage(privateRoute.denied, 'error')
    replace('/')
  }

  render() {
    return (
      <section className='PrivateRoute'>
        Private
      </section>
    )
  }
}

export default hot(module)(PrivateRoute)
