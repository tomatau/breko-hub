import Router from 'koa-router'
import compose from 'server/utils/compose'
import setStore from 'server/middleware/setStore'
import setRouteContext from 'server/middleware/setRouteContext'
import renderRouteContext from 'server/middleware/renderRouteContext'
import * as routes from 'app/routes'
import apiRouter from 'server/routes'

export const rootRouter = Router()

export function setRoutes(assets) {
  rootRouter.stack.length = 0

  const renderApp = compose(
    setStore,
    setRouteContext(routes.makeRoutes),
    renderRouteContext(assets)
  )

  rootRouter
    .use(apiRouter.routes())
    .get('error', '/oops', renderApp)
    .get('react', '/(.*)', renderApp)
}
