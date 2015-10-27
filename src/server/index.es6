import koa from 'koa';
import compress from 'koa-compress';
import session from 'koa-session-store';
import logger from 'koa-logger';
import favicon from 'koa-favicon';
import path from 'path';
import IsomorphicTools from 'webpack-isomorphic-tools';
import {ROOT, APP, SRC} from '~/src/config/paths';
import isomorphicConfig from '~/src/config/isomorphic.config';
import sessionFlashArray from '~/src/server/middleware/sessionFlashArray';
import createStore from '~/src/server/middleware/createStore';
import setRouteContext from '~/src/server/middleware/setRouteContext';
import renderRouteContext from '~/src/server/middleware/renderRouteContext';

const app = koa()
const isomorphicTools = new IsomorphicTools(isomorphicConfig)
if (process.env.NODE_ENV == 'development') isomorphicTools.development()

app.use(compress())
app.use(favicon(`${SRC}/favicon.ico`))

isomorphicTools.server(ROOT, () => {
  app.use(session())
  app.use(sessionFlashArray())
  const makeRoutes = require(path.join(APP, 'makeRoutes'))
  if (process.env.NODE_ENV == 'development') {
    app.use(logger())
    isomorphicTools.refresh()
  }
  app.use(createStore)
  app.use(setRouteContext(makeRoutes))
  app.use(renderRouteContext(isomorphicTools.assets()))
})

export default app;
