import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Bem, cleanProps } from 'app/utils'
import { getMessages } from 'app/modules/flash/flash.selectors'
import { removeMessage } from 'app/modules/flash/flash.actions'
import Msg from './Msg'

const bem = new Bem('FlashMessages')

@connect(state => ({
  messages: getMessages(state),
}), { onClickClose: removeMessage })
export default class FlashMessages extends React.Component {
  static propTypes = {
    messages: PropTypes.array,
  };

  static defaultProps = {
    messages: [],
  };

  render() {
    const { messages, onClickClose, ...props } = this.props
    return (
      <div
        {...bem()}
        {...cleanProps(props)}
      >
        {messages.map(msg => (
          <Msg
            key={msg.id}
            msg={msg}
            onClickClose={onClickClose}
          />
        ))}
      </div>
    )
  }
}
