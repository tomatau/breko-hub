import router from 'koa-router'
import { ERROR_PATH } from 'config/paths'
import { compose } from 'server/utils'
import { compact } from 'app/utils'
import handleNotFound from 'server/middleware/handleNotFound'
import setStore from 'server/middleware/setStore'
import renderReactApp from 'server/middleware/renderReactApp'
import flashMessages from 'server/middleware/flashMessages'
import * as routes from 'app/routes'
import apiRouter from 'server/routes'

export const rootRouter = router()

export function setRoutes(assets) {
  rootRouter.stack.length = 0

  const assetMap = {
    headScripts: compact([ assets.javascript.head ]),
    bodyScripts: compact([ assets.javascript.body ]),
    headStyles: compact([ assets.styles.body, assets.styles.head ]),
    bodyStyles: [],
  }

  const renderApp = compose(
    handleNotFound(assetMap.headStyles),
    setStore,
    flashMessages,
    renderReactApp(routes.makeRoutes(), assetMap)
  )

  rootRouter
    .use(apiRouter.routes())
    .get('error', ERROR_PATH, renderApp)
    .get('react', '/(.*)', renderApp)
}
