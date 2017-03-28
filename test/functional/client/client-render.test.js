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

  describe('Routes', ()=> {
    describe('404', ()=> {
      it('should render the 404 route when no match found', ()=> {
        history.push('/no-match-found')
        expect(this.wrapper.find('.NotFoundRoute')).to.have.length(1)
      })
    })

    describe('/oops', ()=> {
      it('should render the OopsRoute after navigating to /oops', ()=> {
        expect(this.wrapper.find('.OopsRoute')).to.have.length(0)
        history.push('/oops')
        expect(this.wrapper.find('.OopsRoute')).to.have.length(1)
      })
    })

    describe('/bar', ()=> {
      it('should render the BarRoute after navigating to /bar', ()=> {
        expect(this.wrapper.find('.BarRoute')).to.have.length(0)
        history.push('/bar')
        expect(this.wrapper.find('.BarRoute')).to.have.length(1)
      })

      it('should update the page title', ()=> {
        history.push('/bar')
        expect(document.title).to.eql('Bar | Breko Hub')
      })

      it('should render the response from /api/bar', (done)=> {
        history.push('/bar')
        defer(() => { // defer until after promises resolve
          barResponse.forEach(item => {
            const barItem = this.wrapper.find({ children: item })
            expect(barItem).to.have.length(1)
            expect(barItem.type()).to.eql('p')
          })
          done()
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

      afterEach(()=> {
        this.clock.tick(4000)
      })

      it('redirect to /', ()=> {
        history.push('/private')
        expect(this.wrapper.find('.HomeRoute')).to.have.length(1)
      })

      it('adds a flash message', ()=> {
        history.push('/private')
        const flashMsgs = this.wrapper.find('.FlashMessages__Msg')
        expect(flashMsgs).to.have.length(1)
        expect(flashMsgs.text()).to.contain(privateMsg.message)
      })

      it('removes flash messages after 4 seconds', (done)=> {
        history.push('/private')
        let flashMsgs = this.wrapper.find('.FlashMessages__Msg')
        expect(flashMsgs).to.have.length(1)
        defer(() => {
          const flashMsgs = this.wrapper.find('.FlashMessages__Msg')
          expect(flashMsgs).to.have.length(0)
          done()
        })
        this.clock.tick(4000)
      })
    })
  })
})
