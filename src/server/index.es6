import koa from 'koa'
import compress from 'koa-compress'
import session from 'koa-session-store'
import logger from 'koa-logger'
import favicon from 'koa-favicon'
import IsomorphicTools from 'webpack-isomorphic-tools'
import { ROOT, SRC } from '~/src/config/paths'
import isomorphicConfig from '~/src/config/isomorphic.config'
import sessionFlashArray from '~/src/server/middleware/sessionFlashArray'
import configureRouter from '~/src/server/configureRouter'

const app = koa()
const isomorphicTools = new IsomorphicTools(isomorphicConfig)
if (process.env.NODE_ENV == 'development') isomorphicTools.development()

app.use(compress())
app.use(favicon(`${SRC}/favicon.ico`))

isomorphicTools.server(ROOT, () => {
  app.use(session())
  app.use(sessionFlashArray())

  if (process.env.NODE_ENV == 'development') {
    app.use(logger())
    isomorphicTools.refresh()
  }

  configureRouter(app, isomorphicTools)
})

export default app
