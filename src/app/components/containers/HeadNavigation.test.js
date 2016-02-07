import { WrappedComponent as HeadNavigation } from './HeadNavigation'
import sd from 'skin-deep'
import { IndexLink, Link } from 'react-router'
import styles from './HeadNavigation.module.scss'

describe('Head Navigation Component', ()=> {
  let tree
  beforeEach(()=> {
    tree = sd.shallowRender(<HeadNavigation />)
  })

  it('should render a nav element with head-navigation className', ()=> {
    const nav = tree.findNode('nav')
    expect(nav.props).to.have.property('className', 'head-navigation')
  })

  it('should render an IndexLink', ()=> {
    const indexLink = tree.findNode('IndexLink')
    expect(indexLink.type).to.eql(IndexLink)
    expect(indexLink.props).to.have.property('children', 'Home')
    expect(indexLink.props).to.have.property('to', '/')
    expect(indexLink.props).to.have.property('activeClassName', styles.active)
  })

  it('should render a Link', ()=> {
    const link = tree.findNode('Link')
    expect(link.type).to.eql(Link)
    expect(link.props).to.have.property('children', 'Foo')
    expect(link.props).to.have.property('to', '/foo')
    expect(link.props).to.have.property('activeClassName', styles.active)
  })
})
