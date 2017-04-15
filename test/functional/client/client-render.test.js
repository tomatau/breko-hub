import { Main, history } from 'app/main'
import fetchMock from 'fetch-mock'

describe('Client Render', function() {
  before(()=> {
    history.push('/')
  })

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
    this.wrapper = mount(Main)
    defer(done)
  })

  afterEach(()=> {
    this.wrapper.unmount()
    fetchMock.restore()
  })

  it('should set the page title', ()=> {
    expect(document.title).to.eql('Breko Hub')
  })

  it('should set the meta description and chartset', () => {
    const metaCharset = document.querySelector('meta[charset]')
    expect(metaCharset.getAttribute('charset')).to.eql('utf-8')
    const metaDesc = document.querySelector('meta[name=description]')
    expect(metaDesc.getAttribute('content')).to.contain('Breko Hub')
  })

  it(`only renders the HomeRoute`, () => {
    expect(this.wrapper.find('.HomeRoute')).to.be.present()
    expect(this.wrapper.find('.OopsRoute')).not.to.be.present()
    expect(this.wrapper.find('.NotFoundRoute')).not.to.be.present()
    expect(this.wrapper.find('.BarRoute')).not.to.be.present()
    expect(this.wrapper.find('.PrivateRoute')).not.to.be.present()
  })

  describe('Routes', ()=> {
    describe('404', ()=> {
      beforeEach((done) => {
        history.push('/no-match-found')
        defer(done)
      })

      it('should render the 404 route when no match found', ()=> {
        expect(this.wrapper.find('.NotFoundRoute')).to.have.length(1)
      })
    })

    describe('/oops', ()=> {
      beforeEach((done) => {
        history.push('/oops')
        defer(done)
      })

      it('should render the .OopsRoute', ()=> {
        expect(this.wrapper.find('.OopsRoute')).to.have.length(1)
      })
    })

    describe('/bar', ()=> {
      beforeEach((done) => {
        history.push('/bar')
        defer(done)
      })

      it('should render the .BarRoute', ()=> {
        expect(this.wrapper.find('.BarRoute')).to.have.length(1)
      })

      it('should update the page title', ()=> {
        expect(document.title).to.eql('Bar | Breko Hub')
      })

      it('should render the response from /api/bar', ()=> {
        barResponse.forEach(item => {
          const barItem = this.wrapper.find({ children: item })
          expect(barItem).to.have.length(1)
          expect(barItem.type()).to.eql('p')
        })
      })
    })

    describe('/private', ()=> {
      const privateMsg = {
        message: 'You may not view the private route!!',
      }

      before(()=> {
        this.clock = sinon.useFakeTimers()
      })

      after(()=> {
        this.clock.restore()
      })

      beforeEach((done) => {
        history.push('/private')
        defer(done)
      })

      afterEach(()=> {
        this.clock.tick(4000)
      })

      it('redirects to /', ()=> {
        expect(this.wrapper.find('.HomeRoute')).to.have.length(1)
      })

      it('adds a flash message', ()=> {
        const flashMsgs = this.wrapper.find('.FlashMessages__Msg')
        expect(flashMsgs).to.have.length(1)
        expect(flashMsgs.text()).to.contain(privateMsg.message)
      })

      it('removes flash messages after 4 seconds', (done)=> {
        expect(
          this.wrapper.find('.FlashMessages__Msg')
        ).to.have.length(1)
        this.clock.tick(4000)
        defer(() => {
          expect(
            this.wrapper.find('.FlashMessages__Msg')
          ).to.have.length(0)
          done()
        })
      })
    })
  })
})
