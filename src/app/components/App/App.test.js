import DocumentMeta from 'react-helmet'
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

  it('renders a div tag with className at rootNode', ()=> {
    expect(this.tree.hasClass(styles.app)).to.eql(true)
  })

  it('renders a Helmet document meta as firtChild', ()=> {
    const firstChild = this.tree.childAt(0)
    expect(firstChild).to.have.type(DocumentMeta)
  })

  it('renders HeadNavigation as second child', ()=> {
    const secondChild = this.tree.childAt(1)
    expect(secondChild).to.have.type(HeadNavigation)
  })

  it('renders FlashMessages as third child', ()=> {
    const thirdChild = this.tree.childAt(2)
    expect(thirdChild).to.have.type(FlashMessages)
  })

  it('renders an img as fourth child', ()=> {
    const fourthChild = this.tree.childAt(3)
    expect(fourthChild).to.have.type('img')
  })

  it('renders a h1 as fifth child', ()=> {
    const fifthChild = this.tree.childAt(4)
    expect(fifthChild).to.have.type('h1')
  })

  it('renders a main.content as sixth child', ()=> {
    const sixthChild = this.tree.childAt(5)
    expect(sixthChild).to.have.type('main')
    expect(sixthChild).to.have.className(styles.content)
  })

  describe('DocumentMeta', () => {
    it('sets the meta options', () => {
      expect(this.tree.find(DocumentMeta).node).to.eql(
        <DocumentMeta
          defaultTitle='Breko Hub'
          titleTemplate='%s | Breko Hub'>
          <html lang='en' />
          <meta charSet='utf-8' />
          <meta name='viewport' content='width=device-width,initial-scale=1.0' />
          <meta name='description' content='Breko Hub, a minimal boilerplate for building universal react applications' />
          <meta name='keywords' content='react,redux,react-router,koa,universal,babel,es7,hmr,webpack' />
        </DocumentMeta>
      )
    })
  })

  describe('Img', () => {
    it('has avatar as src with alt=me and width=70', () => {
      const img = this.tree.find('img')
      expect(img.props()).to.shallowDeepEqual({
        src: avatarPath,
        alt: 'me',
        width: '70',
      })
    })
  })

  describe('Title', () => {
    it('should have "Breko Hub" as text child', () => {
      const title = this.tree.find('h1')
      expect(title.text()).to.contain('Breko Hub')
    })
  })

  describe('Main', () => {
    it('renders the children in a main', ()=> {
      const children = <p><span>test</span><span>child</span></p>
      const content = shallow(<App>{children}</App>).find('main')

      expect(content.containsMatchingElement(children)).to.eql(true)
    })
  })
})
