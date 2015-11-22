import koa from 'koa'
import compress from 'koa-compress'
import session from 'koa-session-store'
import logger from 'koa-logger'
import favicon from 'koa-favicon'
import { ROOT, SRC } from '~/src/config/paths'
import isomorphicTools from '~/src/server/isomorphicTools'
import sessionFlashArray from '~/src/server/middleware/sessionFlashArray'
import configureRouter from '~/src/server/configureRouter'

const app = koa()

app.use(compress())
app.use(favicon(`${SRC}/favicon.ico`))

isomorphicTools.server(ROOT, () => {
  app.use(session())
  app.use(sessionFlashArray())

  if (process.env.NODE_ENV == 'development') {
    app.use(logger())
  }

  configureRouter(app, isomorphicTools.assets())
})

export default app
