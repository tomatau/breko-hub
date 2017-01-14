import WrappedFlashMessages, { WrappedComponent as FlashMessages } from './FlashMessages'
import Msg from './Msg'
import { shallow, mount } from 'enzyme'
import { Provider } from 'react-redux'
import * as actions from 'app/actions/flash.actions'
import styles from './Msg.module.scss'

describe('FlashMessages Component', function() {
  beforeEach(()=> {
    this.messages = makeMessages()
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
      clickHandler.reset()
      this.tree = shallow(
        <FlashMessages
          messages={this.messages}
          removeMessage={clickHandler}
        />
      )
    })

    it('renders a Msg component for each message in props', ()=> {
      expect(this.tree.find(Msg)).to.have.length(this.messages.length)
      this.messages.forEach(msg => {
        const item = this.tree.find({ msg })
        expect(item).to.have.length(1)
        expect(item.type()).to.eql(Msg)
      })
    })

    it('dispatches a removeMsg with the msg id when clicked', ()=> {
      this.messages.forEach(msg => {
        const item = this.tree.find({ msg })
        item.simulate('click')
        expect(clickHandler).to.have.been.calledWith(msg.id)
        clickHandler.reset()
      })
    })
  })
})

describe('Connected FlashMessages', function() {
  beforeEach(()=> {
    this.messages = makeMessages()
    this.store = helpers.createStore({
      flash: { messages: this.messages },
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
    expect(flashMessages).to.have.length(this.messages.length)
    flashMessages.forEach((node, i) => {
      expect(node.text()).to.contain(this.messages[i].message)
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

const makeMessages = () => [
  {
    id: '1',
    message: 'test message',
    type: 'error',
  }, {
    id: '2',
    message: 'another test message',
    type: 'good',
  }, {
    id: '3',
    message: 'more test message',
    type: 'info',
  },
]
