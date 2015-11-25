import '~/src/config/environment'
import './helpers/cssModulesHook'
import http from 'http'
import koa from 'koa'
import serve from 'koa-static'
import mount from 'koa-mount'
import debug from 'debug'
import { ROOT, STATIC } from '~/src/config/paths'
import { isomorphicTools } from '~/src/server/isomorphicTools'

const app = koa()

app.keys = [ 'd0n7', '7311', '4ny0n3' ]
app.use(serve(STATIC))

isomorphicTools.server(ROOT, () => {
  app.use(function *() {
    const apiServer = require(ROOT + '/src/server')
    yield mount(apiServer(isomorphicTools.assets()))
  })
})

const server = http.createServer(app.callback())
global.socketServer = require(ROOT + '/src/server/sockets')(server)

server.listen(process.env.PORT, () => {
  debug(`Serving`)(`http://localhost:${process.env.PORT}`)
})
