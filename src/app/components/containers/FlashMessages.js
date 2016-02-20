import { connect } from 'react-redux'
import { removeMessage } from 'app/actions/flash'
import * as selectors from 'app/selectors'

export const Msg = ({ msg, ...props }) =>
  <span {...props}
    className={msg.type}>
    {msg.message} <strong>x</strong>
  </span>

@connect(state => ({
  messages: selectors.flashMessages(state),
}), { removeMessage })
class FlashMessages extends React.Component {
  render() {
    const { messages } = this.props
    return (
      <div className='flash-messages'>
        {messages.map(msg =>
          <Msg key={msg.id}
            msg={msg}
            onClick={() => this.clickMessage(msg)}
          />
        )}
      </div>
    )
  }

  clickMessage(msg) {
    this.props.removeMessage(msg.id)
  }
}

export default FlashMessages
