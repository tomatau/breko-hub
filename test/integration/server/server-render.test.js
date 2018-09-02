import React from 'react'
import ReactDOM from 'react-dom/server'
import serve from 'koa-static'
import Router from 'koa-router'
import { Switch, Route, Redirect } from 'react-router-dom'
import supertest from 'supertest'
import { createMemoryHistory } from 'history'
import { LOCATION_CHANGE } from 'react-router-redux'
import Helmet from 'react-helmet'
import { TESTS } from 'config/paths'
import server from 'server-instance'
import StaticRouter from 'server/components/StaticRouter'
import { setRoutes, rootRouter } from 'server/router'
import * as clientApp from 'app/main'

const StubReactApp = (store, history, Router) => (
  <Router history={history}>
    <div>
      <Helmet
        title='test document title'
        meta={[
          { 'name': 'description', 'content': 'test description, hello' },
          { 'charset': 'utf-8' },
        ]}
      >
        <html lang='en' />
      </Helmet>
      <h2>Test App</h2>
      <Switch>
        <Route path='/test' render={() => <div>Test Route</div>} />
        <Route path='/another' render={() => <div>Another Route</div>} />
        <Route path='/redirect' render={() => <Redirect to='/test' />} />
        <Route
          path='/error-route'
          render={() => { throw new Error('error from react route') }}
        />
      </Switch>
    </div>
  </Router>
)

/*
## This file tests functionality around Server Side rendering
Routes have been stubbed out to avoid complexities of testing the full app.
 */
describe('Server Side Render', function () {
  const testRouter = new Router()
  const assets = {
    javascript: {
      body: '/test-asset.js',
    },
    styles: {
      body: '/test-asset.css',
    },
  }
  // helpers available from test/test.setup.js
  const app = helpers.cloneApp(server)

  before(() => {
    Helmet.canUseDOM = false
    // serve assets
    app.use(serve(TESTS + '/fixtures/assets'))
    // setup a broken route
    testRouter.get('/broken-route', () => {
      throw new Error('I am a broken server route')
    })
    app.use(testRouter.routes())
    // add rootRouer routes
    app.use(async (ctx, next) => {
      await setRoutes(assets)
      await rootRouter.routes()(ctx, next)
    })
  })

  beforeEach(() => {
    sandbox.stub(clientApp, 'Main').callsFake(StubReactApp)
  })

  afterEach(() => {
    helpers.cleanup(this)
  })

  after(() => {
    Helmet.canUseDOM = true
  })

  it(`still renders the app when not found`, () =>
    supertest(app.callback())
      .get('/moo')
      .expect(200, /Test App/i)
  )

  it(`returns a 500 when a server error`, () =>
    supertest(app.callback())
      .get('/broken-route')
      .expect(500)
  )

  it(`returns a 500 when a react error`, () =>
    supertest(app.callback())
      .get('/error-route')
      .expect(500)
  )

  it(`renders a html page with assets`, () =>
    supertest(app.callback())
      .get('/test')
      .expect(200)
      .expect(/<!doctype html>/)
      .expect(/<html lang="en">/)
      .expect(/<link href="\/test-asset.css" type="text\/css" rel="stylesheet" media="screen"\/>/)
      .expect(/<script src="\/test-asset.js">/)
  )

  it(`renders document title and meta from helmet`, () =>
    supertest(app.callback())
      .get('/test')
      .expect(200)
      .expect(/<title data-react-helmet="true">test document title<\/title>/)
      .expect(/<meta data-react-helmet="true" name="description" content="test description, hello"\/>/)
      .expect(/<meta data-react-helmet="true" charSet="utf-8"\/>/)
  )

  it(`renders a react route`, () =>
    supertest(app.callback())
      .get('/test')
      .expect(200)
      .expect((res) => {
        const testHistory = helpers.createHistory('/test')
        const renderedApp = ReactDOM.renderToString(
          StubReactApp(null, testHistory, StaticRouter)
        )

        if (!res.text.includes(renderedApp)) {
          throw new Error('should render a react route!')
        }
      })
  )

  it(`renders initial state from the store`, () => {
    const cleanupState = R.compose(
      R.dissocPath([ 'routing', 'location', 'key' ]),
      R.dissocPath([ 'routing', 'location', 'state' ]),
    )
    const initialStateRegex = /<script[ \w-="]*>window.__INITIAL_STATE__ = ([{},/$ \w\n\r":[\]-]+);<\/script>/

    return supertest(app.callback())
      .get('/test')
      .expect((res) => {
        const stubHistory = createMemoryHistory({ initialEntries: [ '/test' ] })
        const stubStore = helpers.createStore(stubHistory)

        stubStore.dispatch({
          type: LOCATION_CHANGE,
          payload: stubHistory.location,
        })

        const expectedState = cleanupState(stubStore.getState())
        const renderedState = cleanupState(JSON.parse(initialStateRegex.exec(res.text)[1] || null))
        if (!R.equals(renderedState, expectedState)) {
          throw new Error('should render initial state')
        }
      })
  })

  it(`wires up session cookie`, () =>
    supertest(app.callback())
      .get('/')
      .expect(200)
      .expect(res => {
        const isntArray = _.negate(_.isArray)
        const cookieHeader = res.headers['set-cookie']
        const allSessionHttpOnly = _.every(cookieHeader, (c) =>
          c.match(/koa:sess/) && c.match(/path=\//) && c.match(/httponly/)
        )
        if (isntArray(cookieHeader)) {
          throw new Error('should provide set-cookie header with an array')
        }
        if (!allSessionHttpOnly) {
          throw new Error('should have httponly session cookies')
        }
      })
  )

  it(`supports react-route redirects`, () =>
    supertest(app.callback())
      .get('/redirect')
      .expect(302)
      .expect('location', '/test')
  )

  it(`serves the favicon.ico`, () =>
    supertest(app.callback())
      .get('/favicon.ico')
      .expect(200)
      .expect('content-type', 'image/x-icon')
  )

  it(`serves gziped assets`, () =>
    supertest(app.callback())
      .get(assets.javascript.body)
      .expect(200)
      .expect('content-encoding', 'gzip')
  )

  // TODO: needs complete session inspection
  it(`supports server side flash messages`)
})
