import router from 'koa-router'
import compose from 'koa-compose'
import setStore from 'server/middleware/set-store'
import flashMessages from 'server/middleware/flash-messages'
import renderApp from 'server/middleware/render-app'
import apiRouter from 'server/api'

const log = debug('server-router')
export const rootRouter = router()

export function setRoutes(assets) {
  log('rebuilding route middleware')
  rootRouter.stack.length = 0

  /* build app from routes, set initial state and set response html */
  const renderReactApp = compose([
    /* set a store for server side state rendering */
    setStore,
    /* wire up flashMessages from redirect to server store */
    flashMessages,
    /* give assets from bundle, set response body from react app */
    renderApp(assets),
  ])

  rootRouter
    .use(apiRouter.routes())
    /* render error page when problem found */
    .get('error', '/oops', renderReactApp)
    /* render react app for all other routes */
    .get('react', '/(.*)', renderReactApp)
}
