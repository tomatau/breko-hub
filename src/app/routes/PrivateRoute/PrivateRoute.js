import { connect } from 'react-redux'
import { replace } from 'react-router-redux'
import { privateRoute } from 'app/copy'
import { addMessage } from 'app/modules/flash/flash.actions'


@connect(null, { replace, addMessage })
export default class PrivateRoute extends React.Component {
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
