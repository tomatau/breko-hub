import Msg from './Msg'
import { shallow } from 'enzyme'
import styles from './Msg.module.scss'

describe('Msg Component', function() {
  beforeEach(()=> {
    this.messages = makeMessages()
    this.msg = _.sample(this.messages)
    this.tree = shallow(<Msg msg={this.msg} />)
  })

  it('should have the className from styles', ()=> {
    expect(this.tree.hasClass(styles.msg)).to.eql(true)
  })

  it('should render the message', ()=> {
    expect(this.tree.text()).to.contain(this.msg.message)
  })

  it('have the bem-modifier according to the msg.type', ()=> {
    this.messages.forEach(msg => {
      this.tree = shallow(<Msg msg={msg} />)
      const modifierClass = `${styles.msg}--${msg.type}`
      expect(this.tree.hasClass(modifierClass)).to.eql(true)
    })
  })

  it('should transfer props to the root element', ()=> {
    const otherProps = { id: 'bar', 'data-other': 'prop' }
    this.tree = shallow(<Msg msg={this.msg} {...otherProps} />)
    expect(this.tree.props()).to.shallowDeepEqual(otherProps)
  })

  it('should render a close button with close className', ()=> {
    expect(this.tree.find({ className: styles.close })).to.have.length(1)
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
