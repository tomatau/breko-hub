import { connect } from 'react-redux'
import { replace } from 'react-router-redux'
import { hot } from 'react-hot-loader'
import { privateRoute, nav as navCopy } from 'app/copy'
import { addMessage } from 'app/modules/flash/flash.actions'

@connect(null, { replace, addMessage })
class PrivateRoute extends React.Component {
  constructor(props) {
    const { addMessage, replace } = props
    addMessage(privateRoute.denied, 'error')
    replace('/')
    super(props)
  }

  render() {
    return (
      <section className='PrivateRoute'>
        {navCopy.private}
      </section>
    )
  }
}

export default hot(module)(PrivateRoute)
