import server from 'server'
import { setRoutes, rootRouter } from 'server/router'
import supertest from 'supertest-as-promised'

describe('Server API', function() {
  // helpers available from test/test.setup.js
  const app = helpers.cloneApp(server)

  before(()=> {
    app.use(function *() {
      setRoutes({
        javascript: {},
        styles: {},
      })
      yield rootRouter.routes()
    })
  })

  it('should respond to ping route', (done)=> {
    const body = { test: 'body' }
    supertest(app.callback())
      .post('/api/ping')
      .send(body)
      .expect('content-type', /application\/json/)
      .expect({ pong: body })
      .end(done)
  })

  it('should respond to the bar route', (done)=> {
    supertest(app.callback())
      .get('/api/bar')
      .expect('content-type', /application\/json/)
      .expect({ bar: [ 'bruce', 'willis', 'wet', 'himself' ] })
      .end(done)
  })
})
