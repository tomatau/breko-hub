import koa from 'koa'
import compress from 'koa-compress'
import session from 'koa-session-store'
import logger from 'koa-logger'
import favicon from 'koa-favicon'
import { ASSETS } from 'config/paths'
import sessionFlashArray from 'server/middleware/sessionFlashArray'
import handleError from 'server/middleware/handleError'

const app = koa()

app.keys = [ 'd0n7', '7311', '4ny0n3' ]

app.use(compress())
app.use(favicon(`${ASSETS}/favicon.ico`))
app.use(session())
app.use(sessionFlashArray())

// reads process.env.DEBUG
if (debug.enabled('server')) {
  app.use(logger())
}

app.use(handleError)

export default app
