import koa from 'koa';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import path from 'path';
import {ROOT, APP} from '~/src/config/paths';
import IsomorphicTools from 'webpack-isomorphic-tools';
import setRouteContext from '~/src/server/middleware/setRouteContext';
import renderRouteContext from '~/src/server/middleware/renderRouteContext';
import isomorphicConfig from '~/src/config/isomorphic.config';

const app = koa()
const isomorphicTools = new IsomorphicTools(isomorphicConfig)
if (process.env.NODE_ENV == 'development') isomorphicTools.development()

isomorphicTools.server(ROOT, () => {
  const makeRoutes = require(path.join(APP, 'makeRoutes'))
  if (process.env.NODE_ENV == 'development') isomorphicTools.refresh()
  app.use(setRouteContext(makeRoutes))
  app.use(renderRouteContext(isomorphicTools.assets()))
})
export default app;
