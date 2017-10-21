import Koa from 'koa'
import mockHTTP from 'node-mocks-http'
import handleError from './handle-error'

const sessionState = {}
const fakeSession = async (ctx, next) => {
  ctx.session = sessionState
  await next()
}

const fakeARequest = (
  app,
  req=mockHTTP.createRequest({ method: 'GET', url: '/' }),
  res=mockHTTP.createResponse()
) => {
  req.socket = {}
  app.callback()(req, res)
}

describe('Handle Error Middleware', () => {
  it('should work without session', (done)=> {
    const app = new Koa()
    app.use(async (ctx, next) => {
      await next()
      expect('everything').to.be.ok
      done()
    })
    app.use(handleError)
    fakeARequest(app)
  })

  it('should clear any session state', (done)=> {
    const app = new Koa()
    app.use(fakeSession)
    app.use(async (ctx, next) => {
      await next()
      expect(ctx.session.state).to.not.exist
      done()
    })
    app.use(handleError)
    sessionState.state = 'populated State'
    fakeARequest(app)
  })
})
