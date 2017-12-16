import supertest from 'supertest'
import server from 'server-instance'
import { setRoutes, rootRouter } from 'server/router'

describe(`Server API`, function () {
  const app = helpers.cloneApp(server)

  before(() => {
    setRoutes()
    app.use(rootRouter.routes())
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
      .expect({ bar: [ 'lorem', 'ipsum', 'dolor', 'sit', 'amet' ] })
  )
})
