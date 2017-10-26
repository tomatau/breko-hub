import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Bem, attrs } from 'app/utils'
import { getMessages } from 'app/modules/flash/flash.selectors'
import Msg from './Msg'

const bem = new Bem('FlashMessages')

@connect(state => ({
  messages: getMessages(state),
}))
export default class FlashMessages extends React.Component {
  static propTypes = {
    messages: PropTypes.array,
  };

  static defaultProps = {
    messages: [],
  };

  render() {
    const { messages, ...props } = this.props
    return (
      <div {...bem()} {...attrs(props)}>
        {messages.map(msg => (
          <Msg key={msg.id} msg={msg} />
        ))}
      </div>
    )
  }
}
