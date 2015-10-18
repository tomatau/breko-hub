import '~/src/config/environment';
import {ROOT} from '~/src/config/paths';
import path from 'path';
import koa from 'koa';
import mount from 'koa-mount';
import webpack from 'webpack';
import webpackConfig from '~/src/config/webpack.config';
import log from 'npmlog';
import chokidar from 'chokidar';
import cssModulesHook from 'css-modules-require-hook';
cssModulesHook({
  generateScopedName(exportedName, exportedPath){
    const path = exportedPath.substr(1)
      .replace(/\//g, "-")
      .replace('.css', '')
    return path + '-' + exportedName;
  }
})
const compiler = webpack(webpackConfig)
const app = koa()

app.use(require('koa-webpack-dev-middleware')(compiler, {
  quiet: true,
  noInfo: true,
  stats: {
    colors: true,
    reasons: true,
  },
  publicPath: webpackConfig.output.publicPath
}))

app.use(require('koa-webpack-hot-middleware')(compiler))

app.use(function *(){
  yield mount(require(ROOT + '/src/server'))
})

const watcher = chokidar.watch(path.join(ROOT, '/src/server'));
watcher.on('ready', () => {
  watcher.on('all', () => {
    log.verbose('reload', "Clearing /server/ module cache from server");
    Object.keys(require.cache).forEach((id) => {
      if (/\/server\//.test(id)) delete require.cache[id];
    });
  });
});

compiler.plugin('done', () => {
  log.verbose('reload', "Clearing /app/ module cache from server")
  Object.keys(require.cache).forEach((id) => {
    if (/\/app\//.test(id)) delete require.cache[id];
    if (/\/server\//.test(id)) delete require.cache[id];
  })
})

app.listen(process.env.PORT, () => {
  log.info(`Serving`, `http://localhost:${process.env.PORT}`)
})
