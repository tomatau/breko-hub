import HeadNavigation from './HeadNavigation'
import sd from 'skin-deep'
import { IndexLink, Link } from 'react-router'
import styles from './HeadNavigation.module.scss'

describe('Head Navigation Component', function() {
  beforeEach(()=> {
    this.tree = sd.shallowRender(<HeadNavigation />)
  })

  it('renders a nav element with styles.nav className', ()=> {
    const nav = this.tree.findNode('nav')
    expect(nav.props).to.have.property('className', styles.nav)
  })

  it('passes other props through', ()=> {
    const otherProps = { foo: 'foo', bar: 'bar' }
    let treeWithProps = sd.shallowRender(<HeadNavigation {...otherProps} />)
    expect(treeWithProps.props).to.shallowDeepEqual(otherProps)
  })

  describe('Links', ()=> {
    const links = [
      { to: '/foo',     content: 'Foo' },
      { to: '/bar',     content: 'Bar' },
      { to: '/private', content: 'Private' },
    ]

    it('only renders the necessary links', ()=> {
      expect(
        this.tree.everySubTree(Link.displayName)
      ).to.have.length(links.length)
    })

    it('renders an IndexLink', ()=> {
      const indexLink = this.tree.findNode(IndexLink.displayName)
      expect(indexLink.type).to.eql(IndexLink)
      expect(indexLink.props).to.eql({
        children: 'Home',
        'to': '/',
        'activeClassName': styles.active,
      })
    })

    links.forEach(link =>
      it(`renders the ${link.content} link`, ()=> {
        const node = this.tree.findComponentLike(
          Link.displayName, { to: link.to }
        )
        expect(node.type).to.eql(Link)
        expect(node.props).to.shallowDeepEqual({
          children: link.content,
          activeClassName: styles.active,
        })
      })
    )
  })
})
