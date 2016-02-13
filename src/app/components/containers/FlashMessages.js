import { connect } from 'react-redux'
import { get } from 'app/utils'
import { removeMessage } from 'app/actions/flash'

const Msg = ({ msg, ...props }) =>
  <span {...props}
    className={msg.type}>
    {msg.message} <strong>x</strong>
  </span>

@connect(state => ({
  messages: get('flash.messages')(state),
}))
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
    this.props.dispatch(removeMessage(msg.id))
  }
}

export default FlashMessages
