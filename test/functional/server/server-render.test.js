import ReactDOM from 'react-dom/server'
import serve from 'koa-static'
import Router from 'koa-router'
import { Route } from 'react-router'
import supertest from 'supertest-as-promised'
import { createMemoryHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import Helmet from 'react-helmet'
import server from 'server-instance'
import { TESTS } from 'config/paths'
import { setRoutes, rootRouter } from 'server/router'
import * as routes from 'app/routes'

const testStore = helpers.createStore()
const AppRoute = ({ children }) => (
  <div>
    <Helmet
      title='test document title'
      meta={ [
        { 'name': 'description', 'content': 'test description, hello' },
        { 'charset': 'utf-8' },
      ]}>
      <html lang='en' />
    </Helmet>
    <h2>App</h2>
    {children}
  </div>
)
const TestRoute = () => <div>Test Route</div>
const AnotherRoute = () => <div>Another Route</div>
const RedirectRoute = () => <div>Never resolved</div>
const ErrorRoute = () => { throw new Error('error from react route') }
const ReactRoutes = (
  <Route path='/' component={AppRoute}>
    <Route path='test' component={TestRoute} />
    <Route path='another' component={AnotherRoute} />
    <Route path='error-route' component={ErrorRoute} />
    <Route path='redirect' component={RedirectRoute}
      onEnter={(_, redirect) => redirect('/test')} />
  </Route>
)

/*
## This file tests functionality around Server Side rendering
Routes have been stubbed out to avoid complexities of testing the full app.

These tests cover:
  - 404 and redirects
  - that the page renders a doctype and assets
  - that the page renders the route
    - using regex on content to avoid checksum parsing
  - that the page renders initial state from the store
  - that gzip works
  - that the favicon works
  - that the headers contain a sessions cookie array

The tests don't cover:
  - flash messages, needs complete session inspection
  - server side meta tag rendering
 */
describe('Server Side Render', function() {
  const testRouter = Router()
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

  before(()=> {
    Helmet.canUseDOM = false
    // serve assets
    app.use(serve(TESTS + '/fixtures/assets'))
    // setup a broken route
    testRouter.get('/broken-route', async () => {
      throw new Error('I am broken')
    })
    app.use(testRouter.routes())
    // add rootRouer routes
    app.use(async (ctx, next) => {
      setRoutes(assets)
      await rootRouter.routes()(ctx, next)
    })
    // set makeRoutes to use stubs
    sinon.stub(routes, 'makeRoutes').returns(ReactRoutes)
  })

  after(()=> {
    Helmet.canUseDOM = true
    routes.makeRoutes.restore()
  })

  it('offers 404 when not found', ()=>
    supertest(app.callback())
      .get('/moo')
      .expect(404, /not found/i)
  )

  it('redirects to /oops when a server error', ()=>
    supertest(app.callback())
      .get('/broken-route')
      .expect(302)
      .expect('location', '/oops')
  )

  it('redirects to /oops when a react error', ()=>
    supertest(app.callback())
      .get('/error-route')
      .expect(302)
      .expect('location', '/oops')
  )

  it('renders a html page with assets', ()=>
    supertest(app.callback())
      .get('/test')
      .expect(200)
      .expect(/<!doctype html>/)
      .expect(/<html lang="en">/)
      .expect(/<link href="\/test-asset.css" type="text\/css" rel="stylesheet" media="screen"\/>/)
      .expect(/<script src="\/test-asset.js">/)
  )

  it('renders document title and meta from helmet', ()=>
    supertest(app.callback())
      .get('/test')
      .expect(200)
      .expect(/<title data-react-helmet="true">test document title<\/title>/)
      .expect(/<meta data-react-helmet="true" name="description" content="test description, hello"\/>/)
      .expect(/<meta data-react-helmet="true" charset="utf-8"\/>/)
  )

  it('renders a react route', ()=>
    supertest(app.callback())
      .get('/test')
      .expect(200)
      .expect((res) => {
        const renderedApp = ReactDOM.renderToString(
          <AppRoute>
            <TestRoute />
          </AppRoute>
        )

        if (!res.text.includes(renderedApp)) {
          throw new Error('should render a react route!')
        }
      })
  )

  it('renders initial state from the store', ()=>
    supertest(app.callback())
      .get('/test')
      .expect((res) => {
        const initStateRegex = /<script[ \w-="]*>window.__INITIAL_STATE__ = ([\{\},/$ \w\n\r":\[\]]+);<\/script>/
        const routingKeyPath = [ 'routing', 'locationBeforeTransitions', 'key' ]
        const routingStatePath = [ 'routing', 'locationBeforeTransitions', 'state' ]
        const standardiseRoutingKeys = R.pipe(
          R.assocPath(routingKeyPath, null),
          R.assocPath(routingStatePath, null)
        )
        const hasDifferentState = _.negate(R.eqBy(standardiseRoutingKeys))
        syncHistoryWithStore(createMemoryHistory('/test'), testStore)
        const renderedState = JSON.parse(initStateRegex.exec(res.text)[1] || null)
        const storeState = testStore.getState()

        if (hasDifferentState(renderedState, storeState)) {
          throw new Error('should render initial state')
        }
      })
  )

  it('wires up session cookie', ()=>
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

  it('supports react-route redirects', ()=>
    supertest(app.callback())
      .get('/redirect')
      .expect(302)
      .expect('location', '/test')
  )

  it('servers the favicon.ico', ()=>
    supertest(app.callback())
      .get('/favicon.ico')
      .expect(200)
      .expect('content-type', 'image/x-icon')
  )

  it('serves gziped assets', ()=>
    supertest(app.callback())
      .get(assets.javascript.body)
      .expect(200)
      .expect('content-encoding', 'gzip')
  )
})
