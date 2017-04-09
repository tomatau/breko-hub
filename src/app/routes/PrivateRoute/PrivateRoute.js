import { connect } from 'react-redux'
import { replace } from 'react-router-redux'
import { addMessage } from 'app/actions/flash.actions'


@connect(null, { replace, addMessage })
export default class PrivateRoute extends React.Component {
  componentWillMount() {
    this.props.addMessage('You may not view the private route!!', 'error')
    this.props.replace('/')
  }

  render() {
    return (
      <h1>Private</h1>
    )
  }
}
