import React from 'react'
import PropTypes from 'prop-types'
import { Bem, noop, cleanProps } from 'app/utils'
import { TYPES } from 'app/modules/flash/flash.constants'
import './Msg.scss'

const bem = new Bem('Msg')

export default class Msg extends React.Component {
  buttonRef = React.createRef();

  static propTypes = {
    msg: PropTypes.shape({
      id: PropTypes.string,
      type: PropTypes.oneOf(Object.values(TYPES)),
      message: PropTypes.string,
    }).isRequired,
    onClickClose: PropTypes.func,
  };

  static defaultProps = {
    msg: {},
    onClickClose: noop,
  };

  componentDidMount() {
    this.buttonRef.current.focus()
  }

  handleClick = () => {
    const { onClickClose, msg } = this.props
    onClickClose(msg.id)
  }

  render() {
    const { msg, className, ...props } = this.props
    const descriptionId = `Msg__description--${msg.id}`
    return (
      <div
        {...bem(null, msg.type, className)}
        role='alertdialog'
        aria-labelledby={descriptionId}
        {...cleanProps(props)}
      >
        <span id={descriptionId}>
          {msg.message}
        </span>
        <button
          ref={this.buttonRef}
          type='button'
          {...bem('close')}
          onClick={this.handleClick}
        >
          &times;
        </button>
      </div>
    )
  }
}
