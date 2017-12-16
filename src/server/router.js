import Router from 'koa-router'
import compose from 'koa-compose'
import Loadable from 'react-loadable'
import setStore from 'server/middleware/set-store'
import flashMessages from 'server/middleware/flash-messages'
import renderApp from 'server/middleware/render-app'

const log = debug('server-router')

export const rootRouter = new Router()

export async function setRoutes(assets) {
  log('rebuilding route middleware')
  rootRouter.stack.length = 0
  await Loadable.preloadAll()

  /* build app from routes, set initial state and set response html */
  const renderReactApp = compose([
    /* set a store for server side state rendering */
    setStore,
    /* wire up flashMessages from redirect to server store */
    flashMessages,
    /* give assets from bundle, set response body from react app */
    renderApp(assets),
  ])

  const { apiRouter, setApiRoutes } = require('server/api')

  setApiRoutes()

  rootRouter
    .use(apiRouter.routes())
    /* render error page when problem found */
    .get('error', '/oops', renderReactApp)
    /* render react app for all other routes */
    .get('react', '/(.*)', renderReactApp)
}
