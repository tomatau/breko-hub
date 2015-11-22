import '~/src/config/environment'
import './helpers/cssModulesHook.es6'
import http from 'http'
import koa from 'koa'
import serve from 'koa-static'
import mount from 'koa-mount'
import debug from 'debug'
import { ROOT, STATIC } from '~/src/config/paths'

const app = koa()

app.keys = [ 'd0n7', '7311', '4ny0n3' ]
app.use(serve(STATIC))
app.use(function *() {
  yield mount(require(ROOT + '/src/server'))
})
const server = http.createServer(app.callback())
global.socketServer = require(ROOT + '/src/server/sockets')(server)

server.listen(process.env.PORT, () => {
  debug(`Serving`)(`http://localhost:${process.env.PORT}`)
})
