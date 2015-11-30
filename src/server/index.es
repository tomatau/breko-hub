import koa from 'koa'
import compress from 'koa-compress'
import session from 'koa-session-store'
import logger from 'koa-logger'
import favicon from 'koa-favicon'
import { SRC } from '~/src/config/paths'
import sessionFlashArray from '~/src/server/middleware/sessionFlashArray'
import handleError from '~/src/server/middleware/handleError'
import configureRouter from '~/src/server/configureRouter'

const app = koa()

app.use(compress())
app.use(favicon(`${SRC}/favicon.ico`))

app.use(session())
app.use(sessionFlashArray())

if (process.env.NODE_ENV == 'development') {
  app.use(logger())
}

app.use(handleError)

export default function(assets) {

  configureRouter(app, assets)

  return app
}
