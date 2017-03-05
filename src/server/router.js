import router from 'koa-router'
import { ERROR_PATH } from 'config/paths'
import { compact } from 'app/utils'
import compose from 'koa-compose'
import handleNotFound from 'server/middleware/handleNotFound'
import setStore from 'server/middleware/setStore'
import makeRenderReactApp from 'server/middleware/renderReactApp'
import flashMessages from 'server/middleware/flashMessages'
import * as routes from 'app/routes'
import apiRouter from 'server/routes'

export const rootRouter = router()

export function setRoutes(assets) {
  rootRouter.stack.length = 0

  const assetMap = {
    headScripts: compact([ assets.javascript.head ]),
    headStyles: compact([ assets.styles.body, assets.styles.head ]),
    bodyScripts: compact([ assets.javascript.body ]),
    bodyStyles: [],
    stringScripts: [],
  }

  /* build app from routes, set initial state and set response html */
  const renderReactApp = compose([
    /* set a store for server side state rendering */
    setStore,
    /* wire up flashMessages from redirect to server store */
    flashMessages,
    makeRenderReactApp(routes.makeRoutes(), assetMap),
  ])

  rootRouter
    .use(apiRouter.routes())
    /* dirty render of NotFoundRoute or JSON response for 404, no client app */
    .use(handleNotFound({ headStyles: assetMap.headStyles }))
    /* render error page when problem found */
    .get('error', ERROR_PATH, renderReactApp)
    /* render react app for all other routes */
    .get('react', '/(.*)', renderReactApp)
}
