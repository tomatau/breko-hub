import React from 'react'
import DocumentMeta from 'react-helmet'
import { app as appCopy } from 'app/copy'
import HeadNavigation from 'app/components/HeadNavigation/HeadNavigation'
import FlashMessages from 'app/components/@FlashMessages/FlashMessages'
import App from './App'
import styles from './App.module.scss'
import avatarPath from 'assets/avatar.jpeg'

describe(`App Component`, function () {
  helpers.setupSnapshots(__filename)

  beforeEach(() => {
    this.wrapper = shallow(<App />)
  })

  it(`renders a div tag with className at rootNode`, () => {
    expect(this.wrapper.type()).to.eql('div')
    expect(this.wrapper).to.have.className(styles.app)
  })

  it(`renders a Helmet document meta as firtChild`, () => {
    const firstChild = this.wrapper.childAt(0)
    expect(firstChild).to.have.type(DocumentMeta)
  })

  it(`renders HeadNavigation as second child`, () => {
    const secondChild = this.wrapper.childAt(1)
    expect(secondChild).to.have.type(HeadNavigation)
  })

  it(`renders FlashMessages as third child`, () => {
    const thirdChild = this.wrapper.childAt(2)
    expect(thirdChild).to.have.type(FlashMessages)
  })

  it(`renders an img as fourth child`, () => {
    const fourthChild = this.wrapper.childAt(3)
    expect(fourthChild).to.have.type('img')
  })

  it(`renders a header as fifth child`, () => {
    expect(
      snap(this.wrapper.childAt(4))
    ).to.matchSnapshot()
  })

  it(`renders a main.content as sixth child`, () => {
    const sixthChild = this.wrapper.childAt(5)
    expect(sixthChild).to.have.type('main')
    expect(sixthChild).to.have.className(styles.content)
  })

  describe(`DocumentMeta`, () => {
    it(`sets the meta options`, () => {
      expect(this.wrapper.find(DocumentMeta).getElement()).to.eql(
        <DocumentMeta
          defaultTitle='Breko Hub'
          titleTemplate='%s | Breko Hub'
        >
          <html lang='en' />
          <meta charSet='utf-8' />
          <meta name='viewport' content='width=device-width,initial-scale=1.0' />
          <meta name='description' content={appCopy.meta.description} />
          <meta name='keywords' content={appCopy.meta.keywords} />
        </DocumentMeta>
      )
    })
  })

  describe(`Img`, () => {
    it(`has avatar as src with alt=me and width=70`, () => {
      const img = this.wrapper.find('img')
      expect(img.props()).to.shallowDeepEqual({
        src: avatarPath,
        alt: 'me',
        width: '70',
      })
    })
  })

  describe(`Title`, () => {
    it(`should have "Breko Hub" as text child`, () => {
      const title = this.wrapper.find('h1')
      expect(title.text()).to.contain('Breko Hub')
    })
  })

  describe(`Main`, () => {
    it(`renders routes inside Main`, () => {
      expect(
        snap(this.wrapper.find('main'))
      ).to.matchSnapshot()
    })
  })
})
