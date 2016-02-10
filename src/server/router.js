import Router from 'koa-router'
import { APP, SERVER } from 'config/paths'
import compose from 'server/utils/compose'
import setStore from 'server/middleware/setStore'
import setRouteContext from 'server/middleware/setRouteContext'
import renderRouteContext from 'server/middleware/renderRouteContext'

export const rootRouter = Router()

export function setRoutes(assets) {
  const reactRoutes = require(`${APP}/makeRoutes`)
  const apiRouter = require(`${SERVER}/routes`)
  rootRouter.stack.length = 0

  const renderApp = compose(
    setStore,
    setRouteContext(reactRoutes),
    renderRouteContext(assets)
  )

  rootRouter
    .use('/api', apiRouter.routes())
    .get('error', '/oops', renderApp)
    .get('react', '/(.*)', renderApp)
}
