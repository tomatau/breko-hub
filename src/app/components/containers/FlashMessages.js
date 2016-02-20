import { connect } from 'react-redux'
import { removeMessage } from 'app/actions/flash'
import * as selectors from 'app/selectors'
import styles from './FlashMessages.module.scss'

export const Msg = ({ msg, ...props }) =>
  <span {...props}
    className={styles[`msg__${msg.type}`]}>
    {msg.message} <strong className={styles.close}>x</strong>
  </span>

Msg.propTypes = {
  msg: PropTypes.shape({
    type: PropTypes.oneOf([ 'error', 'good', 'info' ]),
    message: PropTypes.string,
  }).isRequired,
}

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
