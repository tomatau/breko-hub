import koa from 'koa';
import createLocation from 'history/lib/createLocation';
import createHistory from 'history/lib/createHistory';
import { RoutingContext, match } from 'react-router';

import React from 'react';
import ReactDOMServer from 'react-dom/server';
// needs loading in isomorphic context
import makeRoutes from '~/src/app/makeRoutes';
import {Html} from '~/src/server/components/Html';

const app = koa();

app.use(function *(next){
  const routes = makeRoutes();
  const location = createLocation(this.request.url)
  match({ routes, location }, (error, redirect, renderProps) => {
    if (redirect)
      return this.redirect(redirect.pathname + redirect.search)
    else if (error)
      return this.throw(error.message)
    else if (renderProps == null)
      return this.throw(404, 'Not found')
    else
      this.routeContext = <RoutingContext {...renderProps}/>
  })
  yield next;
})

function makeHtml(initialState, content){
  return ReactDOMServer.renderToString(
    <Html
      title={'Evaluation App'}
      initialState={initialState}
      headScripts={['/head.js']}
      bodyScripts={['/body.js']}
    >
      {content}
    </Html>
  );
}

app.use(function *(next){
  const { routeContext } = this;
  const html = makeHtml(
    {},
    routeContext
  )
  this.response.body = `<!doctype html>${html}`;
})

export default app;
