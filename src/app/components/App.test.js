import DocumentMeta from 'react-document-meta'
import HeadNavigation from 'app/components/HeadNavigation'
import FlashMessages from 'app/components/containers/FlashMessages'
import App from './App'
import { shallow } from 'enzyme'
import styles from './App.module.scss'
import avatarPath from 'assets/avatar.jpeg'

describe('App Component', function() {
  beforeEach(()=> {
    this.tree = shallow(<App />)
  })

  it('renders a main tag with className', ()=> {
    const main = this.tree.find('main')
    expect(main).to.have.length(1)
    expect(main.hasClass(styles.app)).to.eql(true)
  })

  it('renders a document meta', ()=> {
    expect(this.tree.find(DocumentMeta)).to.have.length(1)
  })

  it('renders a head navigation component', ()=> {
    expect(this.tree.find(HeadNavigation)).to.have.length(1)
  })

  it('renders a flash messages component', ()=> {
    expect(this.tree.find(FlashMessages)).to.have.length(1)
  })

  it('renders an image with src alt and width', ()=> {
    const img = this.tree.find('img')
    expect(img).to.have.length(1)
    expect(img.props()).to.shallowDeepEqual({
      src: avatarPath,
      alt: 'me',
      width: 70,
    })
  })

  it('renders the title', ()=> {
    const title = this.tree.find('h1')
    expect(title).to.have.length(1)
    expect(title.text()).to.contain('Breko Hub')
  })

  it('renders the children in a div', ()=> {
    const children = <p><span>test</span><span>child</span></p>
    this.tree = shallow(<App>{children}</App>)
    const childTree = shallow(children)
    const content = this.tree.find(`.${styles.content}`).find('p')
    expect(content.html()).to.eql(childTree.html())
  })
})
