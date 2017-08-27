import { connect } from 'react-redux'
import { noop } from 'lodash'
import PropTypes from 'prop-types'
import { removeMessage } from 'app/actions/flash.actions'
import { Bem } from 'app/utils'
import * as flashSelectors from 'app/selectors/flash.selectors'
import Msg from './Msg'

const bem = new Bem('FlashMessages')

@connect(state => ({
  messages: flashSelectors.getMessages(state),
}), { removeMessage })
export default class FlashMessages extends React.Component {
  static propTypes = {
    messages: PropTypes.array,
    removeMessage: PropTypes.func,
  };

  static defaultProps = {
    messages: [],
    removeMessage: noop,
  };

  clickMessage(msg) {
    this.props.removeMessage(msg.id)
  }

  render() {
    const { messages } = this.props
    return (
      <div {...bem()}>
        {messages.map(msg => (
          <Msg key={msg.id}
            msg={msg}
            onClick={() => this.clickMessage(msg)}
            {...bem('Msg')}
          />
        ))}
      </div>
    )
  }
}
