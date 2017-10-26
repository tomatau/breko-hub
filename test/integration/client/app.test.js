
describe(`Client Render`, function () {
  beforeEach((done) => {
    helpers.prepare(this, '/')
    defer(done)
  })

  afterEach(() => {
    helpers.cleanup(this)
  })

  it(`sets the page title`, done => {
    /* flakey test 'cuz react-helmet */
    defer(() => {
      expect(document.title).to.eql('Breko Hub')
      done()
    })
  })

  it(`sets the meta description and chartset`, () => {
    /* flakey test 'cuz react-helmet */
    defer(() => {
      const metaCharset = document.querySelector('meta[charset]')
      expect(metaCharset.getAttribute('charset')).to.eql('utf-8')
      const metaDesc = document.querySelector('meta[name=description]')
      expect(metaDesc.getAttribute('content')).to.contain('Breko Hub')
    })
  })

  it(`only renders the HomeRoute`, () => {
    this.wrapper.update()
    expect(this.wrapper.find('.HomeRoute')).to.be.present()
    expect(this.wrapper.find('.OopsRoute')).not.to.be.present()
    expect(this.wrapper.find('.NotFoundRoute')).not.to.be.present()
    expect(this.wrapper.find('.BarRoute')).not.to.be.present()
    expect(this.wrapper.find('.PrivateRoute')).not.to.be.present()
  })
})
