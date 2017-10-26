import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Bem, noop, attrs } from 'app/utils'
import { removeMessage } from 'app/modules/flash/flash.actions'
import './Msg.scss'

const bem = new Bem('Msg')

@connect(null, { onClickClose: removeMessage })
export default class Msg extends React.Component {
  static propTypes = {
    msg: PropTypes.shape({
      id: PropTypes.string,
      type: PropTypes.oneOf([ 'error', 'good', 'info' ]),
      message: PropTypes.string,
    }),
    onClickClose: PropTypes.func,
  };

  static defaultProps = {
    msg: {},
    onClickClose: noop,
  };

  clickMessage = () => {
    this.props.onClickClose(this.props.msg.id)
  }

  render() {
    const { msg, className, ...props } = this.props
    return (
      <span {...bem(null, msg.type, className)} {...attrs(props)}>
        {msg.message}
        <button {...bem('close')} onClick={this.clickMessage}>
          &times;
        </button>
      </span>
    )
  }
}
