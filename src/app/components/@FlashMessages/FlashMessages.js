import { connect } from 'react-redux'
import { noop } from 'lodash'
import { removeMessage } from 'app/actions/flash.actions'
import { Bem } from 'app/utils'
import * as flashSelectors from 'app/selectors/flash.selectors'
import Msg from './Msg'

const { PropTypes } = React

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
