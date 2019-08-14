import 'config/environment'
import 'helpers/css-modules-hook'
import 'helpers/clean-asset-json'
import http from 'http'
import serve from 'koa-static'
import { isEnv } from 'app/utils'
import { ROOT, SERVER, SOCKETS, STATIC } from 'config/paths'
import { isomorphicTools, isomorphicPlugin } from 'server/isomorphic-tools'
import app from 'server-instance'

const log = debug('app')

if (isEnv('development')) {
  isomorphicPlugin.development()
  require('helpers/hot-reload').default(app)
} else {
  app.use(serve(STATIC))
}

isomorphicTools.server(ROOT, async () => {
  if (isEnv('development')) {
    app.use(async (ctx, next) => {
      const { rootRouter, setRoutes } = require(`${SERVER}/router`)
      await setRoutes(isomorphicTools.assets())
      await rootRouter.routes()(ctx, next)
    })
  } else {
    const { rootRouter, setRoutes } = require(`${SERVER}/router`)
    await setRoutes(isomorphicTools.assets())
    app.use(rootRouter.routes())
  }
})

const server = http.createServer(app.callback())

global.socketServer = require(SOCKETS).default(server)

server.listen(process.env.PORT, () => {
  log('listening to', `http://localhost:${process.env.PORT}`)
})
