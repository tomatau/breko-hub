/* @flow */
import { connect } from 'react-redux'
import { noop } from 'lodash'
import { removeMessage } from 'app/actions/flash.actions'
import { Bem } from 'app/utils'
import * as flashSelectors from 'app/selectors/flash.selectors'
import Msg from './Msg'
import type { Message } from './types'

@connect(state => ({
  messages: flashSelectors.getMessages(state),
}), { removeMessage })
export default class FlashMessages extends React.Component {
  props: {
    messages: Array<Message>,
    removeMessage: Function,
    SHOULD: bool,
  };

  static defaultProps = {
    messages: [],
    removeMessage: noop,
  };

  static bem = new Bem('FlashMessages');

  clickMessage(msg: Message) {
    this.props.removeMessage(msg.id)
  }

  render() {
    const { messages } = this.props
    return (
      <div {...FlashMessages.bem()}>
        {messages.map(msg =>
          <Msg key={msg.id}
            msg={msg}
            onClick={() => this.clickMessage(msg)}
            {...FlashMessages.bem('Msg')}
          />
        )}
      </div>
    )
  }
}
