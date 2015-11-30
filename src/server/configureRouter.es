import path from 'path'
import Router from 'koa-router'
import koaBody from 'koa-body'
import { APP } from '~/src/config/paths'
import compose from '~/src/server/utils/compose'
import setRouteContext from '~/src/server/middleware/setRouteContext'
import renderRouteContext from '~/src/server/middleware/renderRouteContext'

const rootRouter = Router()
const parseBody = koaBody()
export default function configureRouter(app, assets) {
  const makeRoutes = require(path.join(APP, 'makeRoutes'))
  const apiRouter = Router()
  rootRouter.stack.length = 0

  apiRouter
    .post('ping', parseBody, function *() {
      this.response.body = { pong: this.request.body }
    })

  const renderApp = compose(
    setRouteContext(makeRoutes),
    renderRouteContext(assets)
  )

  rootRouter
    .use('/api', apiRouter.routes())
    .get('/error', renderApp)
    .get('/(.*)', renderApp)

  console.log(app)
  app.use(rootRouter.routes())
}
