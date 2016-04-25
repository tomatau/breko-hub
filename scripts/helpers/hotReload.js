import chokidar from 'chokidar'
import webpack from 'webpack'
import webpackDevelopmentConfig from 'config/webpack.development.config'
import { isomorphicTools } from 'server/isomorphicTools'
import { SERVER } from 'config/paths'

const log = {
  webpack: debug('webpack'),
  hot: debug('hot-reload'),
}

export default function hotReload(app) {
  const compiler = webpack(webpackDevelopmentConfig)

  compiler.plugin('compile', () => log.webpack('Webpack compile started...'))
  compiler.plugin('compilation', () => log.webpack('Webpack compiling...'))

  app.use(require('koa-webpack-dev-middleware')(compiler, {
    quiet: true,
    noInfo: true,
    stats: {
      colors: true,
      reasons: true,
    },
    publicPath: webpackDevelopmentConfig.output.publicPath,
  }))

  app.use(require('koa-webpack-hot-middleware')(compiler))

  const watcher = chokidar.watch(SERVER)
  log.hot('Watching server source')
  watcher.on('ready', () => {
    watcher.on('all', () => {
      log.hot('Clearing /server/ module cache from server')
      Object.keys(require.cache).forEach((id) => {
        if (/\/server\//.test(id)) delete require.cache[id]
      })
    })
  })

  log.hot('Watching client app source')
  compiler.plugin('done', () => {
    log.hot('Clearing /app/ module cache from server')
    Object.keys(require.cache).forEach((id) => {
      if (/\/app\//.test(id)) delete require.cache[id]
      if (/\/server\//.test(id)) delete require.cache[id]
    })
    isomorphicTools.refresh()
  })
}
