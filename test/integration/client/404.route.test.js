
describe(`404 Route`, function () {
  beforeEach(done => {
    helpers.prepare(this, '/no-match-found', done)
  })

  afterEach(() => {
    helpers.cleanup(this)
  })

  it(`renders the 404 route when no match found`, () => {
    expect(this.wrapper.find('.NotFoundRoute')).to.be.present()
  })
})
