
describe(`Private Route`, function () {
  const privateMsg = {
    message: 'You may not view the private route!!',
  }

  before(() => {
    this.clock = sinon.useFakeTimers()
  })

  beforeEach((done) => {
    helpers.prepare(this, '/private', done)
  })

  afterEach(() => {
    helpers.cleanup(this)
    this.clock.tick(4000)
  })

  after(() => {
    this.clock.restore()
  })

  it(`redirects to /`, () => {
    expect(this.wrapper.find('.HomeRoute')).to.be.present()
  })

  it(`adds a flash message`, () => {
    const flashMsgs = this.wrapper.find('span.FlashMessages__Msg')
    expect(flashMsgs).to.be.present()
    expect(flashMsgs.text()).to.contain(privateMsg.message)
  })

  it(`removes flash messages after 4 seconds`, (done) => {
    expect(
      this.wrapper.find('.FlashMessages__Msg')
    ).to.be.present()
    this.clock.tick(4000)
    defer(() => {
      this.wrapper.update()
      expect(
        this.wrapper.find('.FlashMessages__Msg')
      ).to.have.length(0)
      done()
    })
  })
})
