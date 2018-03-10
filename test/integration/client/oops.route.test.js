
describe(`Oops Route`, function () {
  beforeEach(done => {
    helpers.prepare(this, '/oops', done)
  })

  afterEach(() => {
    helpers.cleanup(this)
  })

  it(`renders the .OopsRoute`, () => {
    expect(this.wrapper.find('.OopsRoute')).to.be.present()
  })
})
