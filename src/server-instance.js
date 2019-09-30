import Koa from 'koa'
import compress from 'koa-compress'
import convert from 'koa-convert'
import session from 'koa-session-store'
import logger from 'koa-logger'
import favicon from 'koa-favicon'
import serve from 'koa-static'
import { ASSETS } from 'config/paths'
import sessionFlashArray from 'server/middleware/session-flash-array'
import handleError from 'server/middleware/handle-error'

const app = new Koa()

app.keys = [ 'd0n7', '7311', '4ny0n3' ]

app.use(compress())
app.use(favicon(`${ASSETS}/favicon.ico`))
app.use(serve(ASSETS))
app.use(convert(session()))
app.use(sessionFlashArray())

// reads process.env.DEBUG
/* istanbul ignore if  */
if (debug.enabled('server')) {
  app.use(logger())
}

app.use(handleError)

export default app
