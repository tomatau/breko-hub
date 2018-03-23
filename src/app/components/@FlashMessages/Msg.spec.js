import fixtures from 'helpers/fixtures'
import { WrappedComponent as Msg } from './Msg'

describe(`Msg Component`, function () {
  const shallowM = props => shallow(<Msg {...props} />)

  beforeEach(() => {
    this.messages = fixtures(
      'makeMessages',
      'addMessageCollection',
    )
    this.msg = _.sample(this.messages)
    this.wrapper = shallowM()
  })

  it(`renders a span with Msg and styles.msg classNames`, () => {
    expect(this.wrapper).to.have.tagName('span')
    expect(this.wrapper).to.have.className('Msg')
  })

  it(`allows extending classNames`, () => {
    const className = 'test-class-name'
    this.wrapper.setProps({ className })
    expect(this.wrapper).to.have.className(className)
  })

  it(`transfers props to the root element`, () => {
    const otherProps = {
      id: 'bar',
      'data-other': 'prop',
    }
    this.wrapper.setProps(otherProps)
    const rootNode = this.wrapper.at(0)
    expect(rootNode.props()).to.shallowDeepEqual(otherProps)
  })

  it(`renders the message as first child`, () => {
    const firstChild = shallowM({ msg: this.msg }).childAt(0)
    expect(firstChild).to.have.text(this.msg.message)
  })

  it(`renders the button.Msg__close as last child`, () => {
    const TIMES = '\u00D7'
    const lastChild = shallowM({ msg: this.msg }).childAt(1)
    expect(lastChild).to.have.tagName('button')
    expect(lastChild).to.have.className('Msg__close')
    expect(lastChild).to.have.text(TIMES)
  })

  it(`only renders the close when no message`, () => {
    const children = this.wrapper.children()
    expect(children).to.have.length(1)
    expect(children.at(0)).to.have.className('Msg__close')
  })

  it(`has the bem-modifier according to its type`, () => {
    this.messages.forEach(msg => {
      this.wrapper = shallowM({ msg })
      expect(this.wrapper).to.have.className(`Msg--${msg.type}`)
    })
  })

  describe(`Close button`, () => {
    const clickHandler = sinon.spy()

    beforeEach(() => {
      this.wrapper.setProps({
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
