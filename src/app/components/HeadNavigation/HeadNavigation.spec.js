import sd from 'skin-deep'
import { NavLink } from 'react-router-dom'
import HeadNavigation from './HeadNavigation'
import styles from './HeadNavigation.module.scss'

describe('Head Navigation Component', function () {
  beforeEach(() => {
    this.tree = sd.shallowRender(<HeadNavigation />)
  })

  it('renders a nav element with styles.nav className', () => {
    const nav = this.tree.subTree('nav')
    expect(nav.props).to.have.property('className', styles.nav)
  })

  it('passes other props through', () => {
    const otherProps = { id: 'foo', 'data-prop': 'bar' }
    let treeWithProps = sd.shallowRender(<HeadNavigation {...otherProps} />)
    expect(treeWithProps.props).to.shallowDeepEqual(otherProps)
  })

  describe('NavLinks', () => {
    const links = [
      { to: '/', content: 'Home' },
      { to: '/bar', content: 'Bar' },
      { to: '/private', content: 'Private' },
    ]

    it('only renders the necessary links', () => {
      expect(
        this.tree.everySubTree(NavLink.displayName)
      ).to.have.length(links.length)
    })

    links.forEach(link =>
      it(`renders the ${link.content} link`, () => {
        const node = this.tree.subTree(NavLink, { to: link.to })
        expect(node.type).to.eql(NavLink)
        expect(node.props).to.shallowDeepEqual({
          children: link.content,
          activeClassName: styles.active,
        })
      })
    )
  })
})
