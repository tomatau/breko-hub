import fetchMock from 'fetch-mock'

describe(`Bar Route`, function () {
  const barResponse = [ 'some', 'test', 'response', 'data' ]

  beforeEach(done => {
    fetchMock.get('/api/bar', {
      status: 200,
      body: { bar: barResponse },
      headers:  {
        'Content-Type': 'application/json',
        'Content-Length': '1',
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

  it(`renders the response from /api/bar`, () => {
    barResponse.forEach(item => {
      const barItem = this.wrapper.find({ children: item })
      expect(barItem).to.be.present()
      expect(barItem.type()).to.eql('p')
    })
  })
})
