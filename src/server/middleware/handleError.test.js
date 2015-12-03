import koa from 'koa'
import mockHTTP from 'node-mocks-http'
import handleError from './handleError'

const sessionState = {}
const fakeSession = function *(next) {
  this.session = sessionState
  yield next
}

const fakeARequest = (
  app,
  req=mockHTTP.createRequest({ method: 'GET', url: '/' }),
  res=mockHTTP.createResponse()
) => app.callback()(req, res)

describe('Handle Error Middleware', ()=> {
  it('should work without session', (done)=> {
    const app = koa()
    app.use(function *(next) {
      yield next
      expect('everything').to.be.ok
      done()
    })
    app.use(handleError)
    fakeARequest(app)
  })

  it('should clear any session state', (done)=> {
    const app = koa()
    app.use(fakeSession)
    app.use(function *(next) {
      yield next
      expect(this.session.state).to.not.exist
      done()
    })
    app.use(handleError)
    sessionState.state = 'populated State'
    fakeARequest(app)
  })
})
