import React from 'react'
import fixtures from 'helpers/fixtures'
import ConnectedComponent from './FlashMessages'
import Msg from './Msg'

const { WrappedComponent: FlashMessages } = ConnectedComponent

describe(`FlashMessages Component`, function () {
  const shallowFM = props => shallow(<FlashMessages {...props} />)

  beforeEach(() => {
    this.wrapper = shallowFM()
  })

  it(`renders a div with className as its root node`, () => {
    const rootNode = this.wrapper.at(0)
    expect(rootNode).to.have.tagName('div')
    expect(rootNode).to.have.className('FlashMessages')
  })

  it(`renders an empty div when no messages`, () => {
    expect(this.wrapper.children()).to.have.length(0)
  })

  context(`Given Messages`, () => {
    beforeEach(() => {
      this.messages = fixtures(
        'makeMessages',
        'addMessageCollection',
      )
      this.wrapper.setProps({
        messages: this.messages,
      })
    })

    it(`renders a Msg component for each message in props`, () => {
      expect(
        this.wrapper.find(Msg)
      ).to.have.length(this.messages.length)
      this.messages.forEach(msg => {
        const item = this.wrapper.find({ msg })
        expect(item).to.have.length(1)
        expect(item.type()).to.eql(Msg)
      })
    })
  })
})
