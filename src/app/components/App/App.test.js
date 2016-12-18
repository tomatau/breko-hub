import DocumentMeta from 'react-document-meta'
import HeadNavigation from 'app/components/HeadNavigation/HeadNavigation'
import FlashMessages from 'app/components/@FlashMessages/FlashMessages'
import App from './App'
import { shallow } from 'enzyme'
import styles from './App.module.scss'
import avatarPath from 'assets/avatar.jpeg'

describe('App Component', function() {
  beforeEach(()=> {
    this.tree = shallow(<App />)
  })

  it('renders a div tag with className', ()=> {
    const div = this.tree.find('div').first()
    expect(div).to.have.length(1)
    expect(div.hasClass(styles.app)).to.eql(true)
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

  it('renders the children in a main', ()=> {
    const children = <p><span>test</span><span>child</span></p>
    const content = shallow(<App>{children}</App>).find(`.${styles.content}`)

    expect(content.type()).to.eql('main')
    expect(content.containsMatchingElement(children)).to.eql(true)
  })
})
