import { Main, run } from 'app/main'
import { ConnectedRouter } from 'react-router-redux'
import fetchMock from 'fetch-mock'

describe(`Client Render`, function () {
  const barResponse = [ 'some', 'test', 'response', 'data' ]

  beforeEach((done) => {
    fetchMock.get('/api/bar', {
      status: 200,
      body: { bar: barResponse },
      headers:  {
        'Content-Type': 'application/json',
        'Content-Length': '1',
      },
    })
    /* move into helper */
    this.history = helpers.createHistory('/')
    this.store = helpers.createStore(this.history)
    run()
    this.wrapper = mount(Main(this.store, this.history, ConnectedRouter))
    /* /move into helper */
    defer(done)
  })

  afterEach(() => {
    helpers.cleanup(this)
  })

  it(`sets the page title`, () => {
    expect(document.title).to.eql('Breko Hub')
  })

  it(`sets the meta description and chartset`, () => {
    const metaCharset = document.querySelector('meta[charset]')
    expect(metaCharset.getAttribute('charset')).to.eql('utf-8')
    const metaDesc = document.querySelector('meta[name=description]')
    expect(metaDesc.getAttribute('content')).to.contain('Breko Hub')
  })

  it(`only renders the HomeRoute`, () => {
    this.wrapper.update()
    expect(this.wrapper.find('.HomeRoute')).to.be.present()
    expect(this.wrapper.find('.OopsRoute')).not.to.be.present()
    expect(this.wrapper.find('.NotFoundRoute')).not.to.be.present()
    expect(this.wrapper.find('.BarRoute')).not.to.be.present()
    expect(this.wrapper.find('.PrivateRoute')).not.to.be.present()
  })

  describe(`Routes`, () => {
    describe(`404`, () => {
      beforeEach((done) => {
        this.history.push('/no-match-found')
        defer(() => {
          this.wrapper.update()
          done()
        })
      })

      it(`renders the 404 route when no match found`, () => {
        expect(this.wrapper.find('.NotFoundRoute')).to.be.present()
      })
    })

    describe(`/oops`, () => {
      beforeEach((done) => {
        this.history.push('/oops')
        defer(() => {
          this.wrapper.update()
          done()
        })
      })

      it(`renders the .OopsRoute`, () => {
        expect(this.wrapper.find('.OopsRoute')).to.be.present()
      })
    })

    describe(`/bar`, () => {
      beforeEach((done) => {
        this.history.push('/bar')
        defer(() => {
          this.wrapper.update()
          done()
        })
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

    describe(`/private`, () => {
      const privateMsg = {
        message: 'You may not view the private route!!',
      }

      before(() => {
        this.clock = sinon.useFakeTimers()
      })

      after(() => {
        this.clock.restore()
      })

      beforeEach((done) => {
        this.history.push('/private')
        defer(() => {
          this.wrapper.update()
          done()
        })
      })

      afterEach(() => {
        this.clock.tick(4000)
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
  })
})
