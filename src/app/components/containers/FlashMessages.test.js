import WrappedFlashMessages, { Msg } from './FlashMessages'
import { shallow, mount } from 'enzyme'
import { Provider } from 'react-redux'
import * as actions from 'app/actions/flash'
import styles from './FlashMessages.module.scss'

describe('FlashMessages Component', function() {
  const messages = [ {
    id: '1', message: 'test message', type: 'error',
  }, {
    id: '2', message: 'another test message', type: 'good',
  }, {
    id: '3', message: 'more test message', type: 'info',
  } ]
  const FlashMessages = WrappedFlashMessages.WrappedComponent

  beforeEach(()=> {
    this.tree = shallow(<FlashMessages />)
  })

  it('renders a div with className as its root element', ()=> {
    expect(this.tree.at(0).type()).to.eql('div')
    expect(this.tree.at(0).props()).to.have.property(
      'className', 'FlashMessages'
    )
  })

  it('renders an empty div when no messages', ()=> {
    expect(this.tree.children()).to.have.length(0)
  })

  context('Given Messages', ()=> {
    const clickHandler = sinon.spy()

    beforeEach(()=> {
      this.tree = shallow(
        <FlashMessages
          messages={messages}
          removeMessage={clickHandler} />
      )
    })

    it('renders a Msg component for each message in props', ()=> {
      expect(this.tree.find(Msg)).to.have.length(messages.length)
      messages.forEach(msg => {
        const item = this.tree.find({ msg })
        expect(item).to.have.length(1)
        expect(item.type()).to.eql(Msg)
      })
    })

    it('dispatches a removeMsg with the msg id when clicked', ()=> {
      messages.forEach(msg => {
        const item = this.tree.find({ msg })
        item.simulate('click')
        expect(clickHandler).to.have.been.calledWith(msg.id)
        clickHandler.reset()
      })
    })
  })

  describe('Msg Component', () => {
    beforeEach(()=> {
      this.msg = _.sample(messages)
      this.tree = shallow(<Msg msg={this.msg} />)
    })

    it('should have the className from styles', ()=> {
      expect(this.tree.hasClass(styles.msg)).to.eql(true)
    })

    it('should render the message', ()=> {
      expect(this.tree.text()).to.contain(this.msg.message)
    })

    it('have the bem-modifier according to the msg.type', ()=> {
      messages.forEach(msg => {
        this.tree = shallow(<Msg msg={msg} />)
        const modifierClass = `${styles.msg}--${msg.type}`
        expect(this.tree.hasClass(modifierClass)).to.eql(true)
      })
    })

    it('should transfer props to the root element', ()=> {
      const otherProps = { foo: 'bar', other: 'prop' }
      this.tree = shallow(<Msg msg={this.msg} {...otherProps} />)
      expect(this.tree.props()).to.shallowDeepEqual(otherProps)
    })

    it('should render a close button with close className', ()=> {
      expect(this.tree.find({ className: styles.close })).to.have.length(1)
    })
  })

  describe('Connected FlashMessages', () => {
    beforeEach(()=> {
      this.store = helpers.createStore({
        flash: { messages },
      })
      sinon.stub(this.store, 'dispatch')
      this.tree = mount(
        <Provider store={this.store}>
          <WrappedFlashMessages />
        </Provider>
      )
    })

    it('should render messages from store', ()=> {
      const flashMessages = this.tree.find(`.${styles.msg}`)
      expect(flashMessages).to.have.length(messages.length)
      flashMessages.forEach((node, i) => {
        expect(node.text()).to.contain(messages[i].message)
      })
    })

    it('should be connected to removeMessage action creator',()=> {
      const flashMessage = this.tree.find(FlashMessages)
      flashMessage.prop('removeMessage')('123')
      expect(
        this.store.dispatch
      ).to.have.been.calledWith(actions.removeMessage('123'))
    })
  })
})
