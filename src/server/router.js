import Router from 'koa-router'
import compose from 'koa-compose'
import Loadable from 'react-loadable'
import { ConfigService } from 'app/utils'

const log = debug('server-router')

export const rootRouter = new Router()

export async function setRoutes(assets) {
  log('rebuilding route middleware')
  rootRouter.stack.length = 0

  ConfigService.setEnv(process.env.CONFIG_ENV)

  await Loadable.preloadAll()

  /* build app from routes, set initial state and set response html */
  const renderReactApp = compose([
    /* set a store for server side state rendering */
    require('server/middleware/set-store').default,
    /* wire up flashMessages from redirect to server store */
    require('server/middleware/flash-messages').default,
    /* give assets from bundle, set response body from react app */
    require('server/middleware/render-app').default(assets),
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
