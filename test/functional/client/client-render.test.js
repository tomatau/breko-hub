import { Main } from 'app/main'
import { mount } from 'enzyme'
import { history } from 'app/composition/history'
import App from 'app/components/App/App'
import fetchMock from 'fetch-mock'

describe('Client Render', function() {
  before(()=> {
    history.push('/')
  })

  after(()=> {
  })

  beforeEach(()=> {
    this.wrapper = mount(Main)
  })

  afterEach(()=> {
    this.wrapper.unmount()
    fetchMock.restore()
  })

  it('should render the app', ()=> {
    expect(this.wrapper.find(App)).to.have.length(1)
  })

  it('should set the page title', ()=> {
    expect(document.title).to.eql('Breko Hub')
  })

  it('should set the meta description and chartset', ()=> {
    const metaCharset = document.querySelector('meta[charset]')
    expect(metaCharset.getAttribute('charset')).to.eql('utf-8')
    const metaDesc = document.querySelector('meta[name=description]')
    expect(metaDesc.getAttribute('content')).to.contain('Breko Hub')
  })

  describe('Routes', ()=> {
    describe('/oops', ()=> {
      it('should render the OopsRoute after navigating to /oops', ()=> {
        expect(this.wrapper.find('.OopsRoute')).to.have.length(0)
        history.push('/oops')
        expect(this.wrapper.find('.OopsRoute')).to.have.length(1)
      })
    })

    describe('/bar', ()=> {
      const barResponse = [ 'some', 'test', 'response', 'data' ]
      const requiredHeaders = {
        'Content-Type': 'application/json',
        'Content-Length': '1',
      }

      beforeEach(()=> {
        fetchMock.get('/api/bar', {
          status: 200,
          body: { bar: barResponse },
          headers: requiredHeaders,
        })
      })

      it('should render the BarRoute after navigating to /bar', ()=> {
        expect(this.wrapper.find('.BarRoute')).to.have.length(0)
        history.push('/bar')
        expect(this.wrapper.find('.BarRoute')).to.have.length(1)
      })

      it('should update the page title', ()=> {
        history.push('/bar')
        expect(document.title).to.eql('Breko Hub - Bar')
      })

      it('should render the response from /api/bar', (done)=> {
        history.push('/bar')
        _.defer(() => { // defer until after promises resolve
          barResponse.forEach(item => {
            const barItem = this.wrapper.find({ children: item })
            expect(barItem).to.have.length(1)
            expect(barItem.type()).to.eql('p')
          })
          done()
        })
      })
    })

    describe('404', ()=> {
      it('should render the 404 route when no match found', ()=> {
        history.push('/no-match-found')
        expect(this.wrapper.find('.NotFoundRoute')).to.have.length(1)
      })
    })

    describe('/foo', ()=> {
      it('should render the FooRoute after navigating to /foo', ()=> {
        expect(this.wrapper.find('.FooRoute')).to.have.length(0)
        history.push('/foo')
        expect(this.wrapper.find('.FooRoute')).to.have.length(1)
      })

      it('should render the clientOnly data', ()=> {
        history.push('/foo')
        expect(this.wrapper.text()).to.contain('Client Only Data')
      })
    })

    describe('/private', ()=> {
      const privateMsg = {
        message: 'You may not view the private route!!',
      }

      const selectFlashMessages = () =>
        this.wrapper.findWhere(n => n.hasClass('FlashMessages__Msg'))

      before(()=> {
        this.clock = sinon.useFakeTimers()
      })

      after(()=> {
        this.clock.restore()
      })

      afterEach(()=> {
        this.clock.tick(4000)
      })

      it('redirect to /foo', ()=> {
        history.push('/private')
        expect(this.wrapper.find('.FooRoute')).to.have.length(1)
      })

      it('adds a flash message', ()=> {
        history.push('/private')
        const flashMsgs = selectFlashMessages()
        expect(flashMsgs).to.have.length(1)
        expect(flashMsgs.text()).to.contain(privateMsg.message)
      })

      it.skip('removes flash messages after 4 seconds', (done)=> {
        history.push('/private')
        let flashMsgs = selectFlashMessages()
        expect(flashMsgs).to.have.length(1)
        _.defer(() => {
          const flashMsgs = selectFlashMessages()
          expect(flashMsgs).to.have.length(0)
          done()
        })
        this.clock.tick(4000)
      })
    })
  })
})
