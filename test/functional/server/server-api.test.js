import supertest from 'supertest-as-promised'
import server from 'server-instance'
import { setRoutes, rootRouter } from 'server/router'

describe(`Server API`, function() {
  // helpers available from test/test.setup.js
  const app = helpers.cloneApp(server)

  before(() => {
    app.use(async(ctx, next) => {
      setRoutes({
        javascript: {},
        styles: {},
      })
      await rootRouter.routes()(ctx, next)
    })
  })

  const body = { test: 'body' }

  it(`responds to ping route`, () =>
    supertest(app.callback())
      .post('/api/ping')
      .send(body)
      .expect('content-type', /application\/json/)
      .expect({ pong: body })
  )

  it(`responds to the bar route`, () =>
    supertest(app.callback())
      .get('/api/bar')
      .expect('content-type', /application\/json/)
      .expect({ bar: [ 'bruce', 'willis', 'wet', 'himself' ] })
  )
})
