
describe(`Client App render`, function () {
  beforeEach(done => {
    helpers.prepare(this, '/', done)
  })

  afterEach(() => {
    helpers.cleanup(this)
  })

  it(`sets the page title`, () => {
    expect(document.title).to.eql('Breko Hub')
  })

  it(`sets the meta description and chartset`, () => {
    expect(
      document.querySelector('meta[charset]').getAttribute('charset')
    ).to.eql('utf-8')
    expect(
      document.querySelector('meta[name=description]').getAttribute('content')
    ).to.eql('A boilerplate for building universal react applications')
  })

  it(`only renders the HomeRoute`, () => {
    expect(this.wrapper.find('.HomeRoute')).to.be.present()
    expect(this.wrapper.find('.OopsRoute')).not.to.be.present()
    expect(this.wrapper.find('.NotFoundRoute')).not.to.be.present()
    expect(this.wrapper.find('.BarRoute')).not.to.be.present()
    expect(this.wrapper.find('.PrivateRoute')).not.to.be.present()
  })
})
