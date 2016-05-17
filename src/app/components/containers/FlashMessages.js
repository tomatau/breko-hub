import { connect } from 'react-redux'
import { noop } from 'lodash'
import { removeMessage } from 'app/actions/flash'
import { Bem } from 'app/utils'
import * as selectors from 'app/selectors'
import styles from './FlashMessages.module.scss'

const { PropTypes } = React

export const Msg = ({ msg, className, ...props }) =>
  <span {...props}
    {...Msg.bem(null, msg.type, className)}>
    {msg.message}
    &nbsp;
    <strong className={styles.close}>x</strong>
  </span>

Msg.bem = Bem(styles.msg)

Msg.propTypes = {
  msg: PropTypes.shape({
    type: PropTypes.oneOf([ 'error', 'good', 'info' ]),
    message: PropTypes.string,
  }).isRequired,
}

@connect(state => ({
  messages: selectors.flashMessages(state),
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

  bem = new Bem('FlashMessages');

  clickMessage(msg) {
    this.props.removeMessage(msg.id)
  }

  render() {
    const { messages } = this.props
    return (
      <div {...this.bem()}>
        {messages.map(msg =>
          <Msg key={msg.id}
            msg={msg}
            onClick={() => this.clickMessage(msg)}
            {...this.bem('Msg')}
          />
        )}
      </div>
    )
  }
}
