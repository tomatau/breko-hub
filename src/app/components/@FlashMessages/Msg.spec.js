import React from 'react'
import fixtures from 'helpers/fixtures'
import Msg from './Msg'

describe(`Msg Component`, function () {
  const mountComp = props => mount(<Msg {...props} />)

  beforeEach(() => {
    this.messages = fixtures(
      'makeMessages',
      'addMessageCollection',
    )
    this.msg = _.sample(this.messages)
    this.mounted = mountComp({ msg: this.msg })
    this.wrapper = this.mounted.childAt(0)
  })

  it(`renders a span with Msg and styles.msg classNames`, () => {
    expect(this.wrapper).to.have.tagName('div')
    expect(this.wrapper).to.have.className('Msg')
  })

  it(`has a11y props for role and aria-labelledby`, () => {
    expect(this.wrapper).to.have.prop('role', 'alertdialog')
    expect(this.wrapper).to.have.prop(
      'aria-labelledby',
      `Msg__description--${this.msg.id}`,
    )
  })

  it(`allows extending classNames`, () => {
    const className = 'test-class-name'
    this.mounted.setProps({ className })
    expect(this.wrapper).to.have.className(className)
  })

  it(`transfers props to the root element`, () => {
    const otherProps = {
      id: 'bar',
      'data-other': 'prop',
    }
    this.mounted.setProps(otherProps)
    const rootNode = this.mounted.childAt(0)
    expect(rootNode.props()).to.shallowDeepEqual(otherProps)
  })

  it(`renders a span#Msg__description--<id>{message} as first child`, () => {
    const firstChild = this.wrapper.childAt(0)
    expect(firstChild).to.have.tagName('span')
    expect(firstChild).to.have.prop('id', `Msg__description--${this.msg.id}`)
    expect(firstChild).to.have.text(this.msg.message)
  })

  it(`renders the button.Msg__close as last child`, () => {
    const TIMES = '\u00D7'
    const lastChild = this.wrapper.childAt(1)
    expect(lastChild).to.have.tagName('button')
    expect(lastChild).to.have.className('Msg__close')
    expect(lastChild).to.have.text(TIMES)
  })

  it(`has the bem-modifier according to its type`, () => {
    this.messages.forEach(msg => {
      this.root = mountComp({ msg })
      expect(this.root).to.have.className(`Msg--${msg.type}`)
    })
  })

  describe(`Close button`, () => {
    const clickHandler = sinon.spy()

    beforeEach(() => {
      this.mounted.setProps({
        msg: this.msg,
        onClickClose: clickHandler,
      })
    })

    afterEach(() => {
      clickHandler.resetHistory()
    })

    it(`dispatches a removeMsg with the msg id when clicked`, () => {
      this.wrapper.find('.Msg__close').simulate('click')
      expect(clickHandler).to.have.been.calledWith(this.msg.id)
    })
  })
})
