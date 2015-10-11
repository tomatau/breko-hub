import koa from 'koa';
import React from 'react';
import ReactDOMServer from 'react-dom/server';

import setRouteContext from '~/src/server/middleware/setRouteContext';
import renderRouteContext from '~/src/server/middleware/renderRouteContext';

// needs loading in isomorphic context
import makeRoutes from '~/src/app/makeRoutes';
const app = koa();

// TODO: start isomorphic tools here first
app.use(setRouteContext(makeRoutes))
app.use(renderRouteContext())

export default app;
