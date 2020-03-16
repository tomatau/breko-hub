import React from 'react'
import { Helmet as DocumentMeta } from 'react-helmet-async'
import { app as appCopy } from 'app/copy'
import HeadNavigation from 'app/components/HeadNavigation/HeadNavigation'
import FlashMessages from 'app/components/@FlashMessages/FlashMessages'
import App from './App'
import styles from './App.module.scss'

describe(`App Component`, function () {
  helpers.setupSnapshots(__filename)

  beforeEach(() => {
    this.wrapper = shallow(<App.WrappedComponent />)
  })

  it(`renders a Helmet document meta as firstChild`, () => {
    const firstChild = this.wrapper.childAt(0)
    expect(firstChild).to.have.type(DocumentMeta)
  })

  it(`renders a div tag with className as second child`, () => {
    const secondChild = this.wrapper.childAt(1)
    expect(secondChild.type()).to.eql('div')
    expect(secondChild).to.have.className(styles.app)
  })

  it(`renders HeadNavigation as first child of div`, () => {
    const firstChild = this.wrapper.childAt(1).childAt(0)
    expect(firstChild).to.have.type(HeadNavigation)
  })

  it(`renders a header as second child of div`, () => {
    expect(
      snap(this.wrapper.childAt(1).childAt(1))
    ).to.matchSnapshot()
  })

  it(`renders a main.content[aria-live] as third child of div`, () => {
    const thirdChild = this.wrapper.childAt(1).childAt(2)
    expect(thirdChild).to.have.type('main')
    expect(thirdChild).to.have.className(styles.content)
    expect(thirdChild).to.have.prop('aria-live', 'polite')
  })

  describe(`DocumentMeta`, () => {
    it(`sets the meta options`, () => {
      expect(this.wrapper.find(DocumentMeta).getElement()).to.eql(
        <DocumentMeta
          defaultTitle={`${appCopy.title}`}
          titleTemplate={`%s | ${appCopy.title}`}
        >
          <html lang='en' />
          <meta charSet='utf-8' />
          <meta name='description' content={appCopy.meta.description} />
          <meta name='keywords' content={appCopy.meta.keywords} />
          <meta name='viewport' content='width=device-width,initial-scale=1.0' />
        </DocumentMeta>
      )
    })
  })

  describe(`Title`, () => {
    it(`should have app title as text`, () => {
      const title = this.wrapper.find('h1')
      expect(title.text()).to.contain(appCopy.title)
    })
  })

  describe(`Main`, () => {
    it(`renders FlashMessages as first child of main`, () => {
      const firstChild = this.wrapper.find('main').childAt(0)
      expect(firstChild).to.have.type(FlashMessages)
    })

    it(`renders routes inside Main`, () => {
      expect(
        snap(this.wrapper.find('main'))
      ).to.matchSnapshot()
    })
  })
})
