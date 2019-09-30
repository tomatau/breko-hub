import React from 'react'
import { NavLink } from 'react-router-dom'
import WrappedHeadNavigation from './HeadNavigation'
import styles from './HeadNavigation.module.scss'

const HeadNavigation = WrappedHeadNavigation.WrappedComponent

describe(`Head Navigation Component`, function () {
  const shallowHN = props => shallow(<HeadNavigation {...props} />)

  beforeEach(() => {
    this.wrapper = shallowHN()
  })

  it(`renders a nav.HeadNavigation as rootNode`, () => {
    const rootNode = this.wrapper.at(0)
    expect(rootNode).to.have.type('nav')
    expect(rootNode).to.have.className('HeadNavigation')
  })

  it(`extends styles.nav className on rootNode`, () => {
    const className = 'test-class-name'
    const rootNode = shallowHN({ className }).at(0)
    expect(rootNode).to.have.className(styles.nav)
    expect(rootNode).to.have.className(className)
  })

  it(`passes other props through`, () => {
    const otherProps = { id: 'foo', 'data-prop': 'bar' }
    const rootNode = shallowHN(otherProps).at(0)
    expect(rootNode.props()).to.shallowDeepEqual(otherProps)
  })

  describe(`NavLinks`, () => {
    const links = [
      { to: '/', content: 'Home', exact: true },
      { to: '/bar', content: 'Bar' },
      { to: '/private', content: 'Admin' },
    ]

    it(`only renders the necessary links`, () => {
      expect(
        this.wrapper.find(NavLink)
      ).to.have.length(links.length)
    })

    links.forEach((link, idx) =>
      it(`renders the ${link.content} link`, () => {
        const navLink = this.wrapper.find(NavLink).at(idx)
        expect(navLink.props()).to.shallowDeepEqual({
          to: link.to,
          children: link.content,
          activeClassName: styles.active,
          ...link.exact && { exact: true },
        })
      })
    )
  })
})
