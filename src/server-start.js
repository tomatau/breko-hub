import 'config/environment'
import 'helpers/cssModulesHook'
import 'helpers/cleanAssetJson'
import hotReload from 'helpers/hotReload'
import { ROOT, SERVER, SOCKETS, STATIC } from 'config/paths'
import { argv } from 'yargs'
import http from 'http'
import serve from 'koa-static'
import open from 'open'
import { isomorphicTools, isomorphicPlugin } from 'server/isomorphicTools'
import app from 'server/index'

const log = debug('app')

if (process.env.NODE_ENV === 'development') {
  isomorphicPlugin.development()
  hotReload(app)
} else {
  app.use(serve(STATIC))
}

isomorphicTools.server(ROOT, () => {
  if (process.env.NODE_ENV === 'development') {
    app.use(function *() {
      const { rootRouter, setRoutes } = require(`${SERVER}/router`)
      setRoutes(isomorphicTools.assets())
      yield rootRouter.routes()
    })
  } else {
    const { rootRouter, setRoutes } = require(`${SERVER}/router`)
    setRoutes(isomorphicTools.assets())
    app.use(rootRouter.routes())
  }
})

const server = http.createServer(app.callback())
global.socketServer = require(SOCKETS)(server)

server.listen(process.env.PORT, () => {
  const URI = `http://localhost:${process.env.PORT}`
  log('Serving', URI)
  if (argv.open || argv.o) open(URI)
})
