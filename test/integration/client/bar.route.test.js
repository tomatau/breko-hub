import fetchMock from 'fetch-mock'

describe(`Bar Route`, function () {
  const barResponse = [ 'some', 'test', 'response', 'data' ]

  beforeEach(done => {
    fetchMock.mock({
      matcher: 'https://breko-hub-test.com/api/bar',
      method: 'GET',
      name: 'bar-endpoint',
      response: {
        status: 200,
        body: { bar: barResponse },
      },
    })
    helpers.prepare(this, '/bar', done)
  })

  afterEach(() => {
    helpers.cleanup(this)
  })

  it(`updates the page title`, () => {
    expect(document.title).to.eql('Bar | Breko Hub')
  })

  it(`renders the .BarRoute`, () => {
    expect(this.wrapper.find('.BarRoute')).to.be.present()
  })

  it(`calls the /bar endpoint once`, () => {
    expect(fetchMock.called('bar-endpoint')).to.eql(true)
  })

  it(`renders the response from /api/bar`, () => {
    barResponse.forEach(item => {
      const barItem = this.wrapper.find({ children: item })
      expect(barItem).to.be.present()
      expect(barItem.type()).to.eql('p')
    })
  })
})
