import path from 'path'
import Router from 'koa-router'
import koaBody from 'koa-body'
import { APP } from 'config/paths'
import compose from 'server/utils/compose'
import setStore from 'server/middleware/setStore'
import setRouteContext from 'server/middleware/setRouteContext'
import renderRouteContext from 'server/middleware/renderRouteContext'

export const rootRouter = Router()
const parseBody = koaBody()

export function setRoutes(assets) {
  const reactRoutes = require(path.join(APP, 'makeRoutes'))
  const apiRouter = Router()
  rootRouter.stack.length = 0

  apiRouter
    .post('ping', 'ping', parseBody, function *() {
      this.response.body = { pong: this.request.body }
    })

  const renderApp = compose(
    setStore,
    setRouteContext(reactRoutes),
    renderRouteContext(assets)
  )

  rootRouter
    .use('/api', apiRouter.routes())
    .get('error', '/error', renderApp)
    .get('react', '/(.*)', renderApp)
}
