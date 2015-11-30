import path from 'path'
import { last, has } from 'lodash'
import Router from 'koa-router'
import koaBody from 'koa-body'
import { APP } from '~/src/config/paths'
import compose from '~/src/server/utils/compose'
import setRouteContext from '~/src/server/middleware/setRouteContext'
import renderRouteContext from '~/src/server/middleware/renderRouteContext'

const rootRouter = Router()
const parseBody = koaBody()
const removeRouterMiddleware = app =>
  has(last(app.middleware), 'router') && app.middleware.pop()

export default function configureRouter(app, assets) {
  const makeRoutes = require(path.join(APP, 'makeRoutes'))
  const apiRouter = Router()
  rootRouter.stack.length = 0

  apiRouter
    .post('ping', 'ping', parseBody, function *() {
      this.response.body = { pong: this.request.body }
    })

  const renderApp = compose(
    setRouteContext(makeRoutes),
    renderRouteContext(assets)
  )

  rootRouter
    .use('/api', apiRouter.routes())
    .get('error', '/error', renderApp)
    .get('react', '/(.*)', renderApp)

  removeRouterMiddleware(app)
  app.use(rootRouter.routes())
}
