import React from 'react'
import ReactDOM from 'react-dom/server'
import serve from 'koa-static'
import Router from 'koa-router'
import { Switch, Route, Redirect } from 'react-router-dom'
import supertest from 'supertest'
import { createMemoryHistory } from 'history'
import { Helmet, HelmetProvider } from 'react-helmet-async'
import { TESTS } from 'config/paths'
import server from 'server-instance'
import StaticRouter from 'server/components/StaticRouter'
import { setRoutes, rootRouter } from 'server/router'
import * as clientApp from 'app/main'

const StubReactApp = (store, history, Router) => (
  <Router history={history}>
    <main>
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
        <Route path='/test' render={() => <section>Test Route</section>} />
        <Route path='/another' render={() => <section>Another Route</section>} />
        <Route path='/redirect' render={() => <Redirect to='/test' />} />
        <Route
          path='/error-route'
          render={() => { throw new Error('error from react route') }}
        />
      </Switch>
    </main>
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
      head: '/test-head-asset.js',
      main: '/test-main-asset.js',
      deferred: '/test-deferred-asset.js',
    },
    styles: {
      head: '/test-head-asset.css',
      main: '/test-main-asset.css',
      deferred: '/test-deferred-asset.css',
    },
  }
  // helpers available from test/test.setup.js
  const app = helpers.cloneApp(server)

  before(() => {
    HelmetProvider.canUseDOM = false
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
    HelmetProvider.canUseDOM = true
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

  it(`renders document title and meta data`, () =>
    supertest(app.callback())
      .get('/test')
      .expect(200)
      .expect(/<!doctype html>/)
      .expect(/<html lang="en">/)
      .expect(/<title[\w\s-="]*>test document title<\/title>/)
      .expect(/<meta[\w\s-="]* name="description" content="test description, hello"\/>/)
      .expect(/<meta[\w\s-="]* charSet="utf-8"\/>/)
  )

  it(`renders a head assets`, () =>
    supertest(app.callback())
      .get('/test')
      .expect(200)
      .expect(/<head>.*<link href="\/test-head-asset.css" type="text\/css" rel="stylesheet" media="screen"\/>.*<\/head>/)
      .expect(/<head>.*<script src="\/test-head-asset.js"><\/script>.*<\/head>/)
      .expect(/<head>.*<link rel="preload" as="script" href="\/test-head-asset.js"\/>.*<\/head>/)
  )

  it(`renders deferred scripts and deferred css in body`, () =>
    supertest(app.callback())
      .get('/test')
      .expect(200)
      .expect(/<body>.*<script src="\/test-deferred-asset.js\"><\/script>.*<\/body>/)
      // use loadCSS for deferred CSS and <noscript> fallback
      .expect(/<body>.*<script>loadCSS\('\/test-deferred-asset.css'\)<\/script>.*<\/body>/)
      .expect(/<body>.*<noscript><link href="\/test-deferred-asset.css" rel="stylesheet" \/><\/noscript>.*<\/body>/)
  )

  it(`renders preload links, links and scripts for main assets`, () =>
    supertest(app.callback())
      .get('/test')
      .expect(200)
      .expect(/<head>.*<link[\w\s-="]* rel="preload" as="style" href="\/test-main-asset.css"\/>.*<\/head>/)
      .expect(/<head>.*<link[\w\s-="]* rel="preload" as="script" href="\/test-main-asset.js"\/>.*<\/head>/)
      .expect(/<head>.*<link[\w\s-="]* rel="stylesheet" href="\/test-main-asset.css"\/>.*<\/head>/)
      .expect(/<body>.*<script async=""[\w\s-="]* src="\/test-main-asset.js"><\/script>.*<\/body>/)
  )

  it(`renders the config_env setting`, () =>
    supertest(app.callback())
      .get('/test')
      .expect(200)
      .expect(/<script>window.__CONFIG_ENV__ = "test";<\/script>/)
  )

  it(`renders initial state from the store`, () => {
    const cleanupState = R.compose(
      R.dissocPath([ 'router', 'location', 'key' ]),
      R.dissocPath([ 'router', 'location', 'state' ]),
      R.mapObjIndexed(R.filter(Boolean)),
    )
    const initialStateRegex = /<script[ \w-="]*>window.__INITIAL_STATE__ = ([{},/$ \w\n\r":[\]-]+);<\/script>/

    return supertest(app.callback())
      .get('/test')
      .expect((res) => {
        const stubHistory = createMemoryHistory({ initialEntries: [ '/test' ] })
        const stubStore = helpers.createStore(stubHistory)

        const expectedState = cleanupState(stubStore.getState())
        const renderedState = cleanupState(
          JSON.parse(initialStateRegex.exec(res.text)[1] || null)
        )

        if (!R.equals(renderedState, expectedState)) {
          throw new Error('should render initial state')
        }
      })
  })

  it(`renders a react route`, () =>
    supertest(app.callback())
      .get('/test')
      .expect(200)
      .expect((res) => {
        const testHistory = helpers.createHistory('/test')
        const renderedApp = ReactDOM.renderToString(
          <HelmetProvider context={{}}>
            {StubReactApp(null, testHistory, StaticRouter)}
          </HelmetProvider>
        )

        if (!res.text.includes(renderedApp)) {
          throw new Error('should render a react route!')
        }
      })
  )

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

  it(`serves the robots.txt`, () =>
    supertest(app.callback())
      .get('/robots.txt')
      .expect(200, `User-agent: *\nAllow: /\n`)
      .expect('content-type', 'text/plain; charset=utf-8')
  )

  it(`serves gziped assets`, () =>
    supertest(app.callback())
      .get(assets.javascript.main)
      .expect(200)
      .expect('content-encoding', 'gzip')
  )

  // TODO: needs complete session inspection
  it(`supports server side flash messages`)
})
