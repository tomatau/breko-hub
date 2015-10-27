import path from 'path';
import log from 'npmlog';
import Router from 'koa-router';
import koaBody from 'koa-body';
import {APP} from '~/src/config/paths';
import compose from '~/src/server/middleware/compose';
import createStore from '~/src/server/middleware/createStore';
import setRouteContext from '~/src/server/middleware/setRouteContext';
import renderRouteContext from '~/src/server/middleware/renderRouteContext';

export default function configureRouter(app, isomorphicTools) {
  const makeRoutes = require(path.join(APP, 'makeRoutes'))
  const rootRoutes = Router()
  const parseBody = koaBody()

  const renderApp = compose(
    createStore,
    setRouteContext(makeRoutes),
    renderRouteContext(isomorphicTools.assets())
  )

  rootRoutes
    .get('/(.*)', renderApp)

  app.use(rootRoutes.routes())
}
