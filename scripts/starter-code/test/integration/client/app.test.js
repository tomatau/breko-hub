
describe(`Client App render`, function () {
  beforeEach(done => {
    helpers.prepare(this, '/', done)
  })

  afterEach(() => {
    helpers.cleanup(this)
  })

  it(`sets the page title`, () => {
    expect(document.title).to.eql('App')
  })

  it(`sets the meta description and chartset`, () => {
    expect(
      document.querySelector('meta[charset]').getAttribute('charset')
    ).to.eql('utf-8')
    expect(
      document.querySelector('meta[name=description]').getAttribute('content')
    ).to.eql('An app')
  })

  it(`only renders the HomeRoute`, () => {
    expect(this.wrapper.find('.HomeRoute')).to.be.present()
    expect(this.wrapper.find('.OopsRoute')).not.to.be.present()
    expect(this.wrapper.find('.NotFoundRoute')).not.to.be.present()
  })
})
