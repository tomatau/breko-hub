
describe(`Private Route`, function () {
  const privateMsg = {
    message: 'You were redirected because you can\'t view the private page',
  }

  beforeEach(done => {
    this.clock = sinon.useFakeTimers()
    helpers.prepare(this, '/private', done)
  })

  afterEach(() => {
    helpers.cleanup(this)
  })

  it(`redirects to /`, () => {
    expect(this.wrapper.find('.HomeRoute')).to.be.present()
  })

  it(`adds a flash message`, () => {
    const flashMsgs = this.wrapper.find('.Msg')
    expect(flashMsgs).to.be.present()
    expect(flashMsgs.text()).to.contain(privateMsg.message)
  })

  it(`removes flash messages when clicked`, done => {
    expect(
      this.wrapper.find('.Msg')
    ).to.have.length(1)
    this.wrapper.find('.Msg__close').simulate('click', helpers.createEvent())
    defer(() => {
      this.wrapper.update()
      expect(
        this.wrapper.find('.Msg')
      ).to.have.length(0)
      done()
    })
  })

  it(`removes flash messages after 4 seconds`, done => {
    expect(
      this.wrapper.find('.Msg')
    ).to.be.present()
    this.clock.tick(4000)
    defer(() => {
      this.wrapper.update()
      expect(
        this.wrapper.find('.Msg')
      ).to.have.length(0)
      done()
    })
  })
})
