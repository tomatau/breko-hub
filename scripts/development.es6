import '~/src/config/environment';
import {ROOT, STYLES, APP} from '~/src/config/paths';
import path from 'path';
import koa from 'koa';
import mount from 'koa-mount';
import webpack from 'webpack';
import log from 'npmlog';
import chokidar from 'chokidar';
import cssModulesHook from 'css-modules-require-hook';
import sass from 'node-sass';
import loaderUtils from 'loader-utils';
import webpackConfig from '~/src/config/webpack.config';
cssModulesHook({
  extensions: ['.scss', '.css'],
  generateScopedName(exportedName, exportedPath){
    const path = exportedPath.substr(1)
      .replace(/\.s?css$/, '')
      .replace(/\/|\./g, "-")
    return path + '-' + exportedName;
  },
  preprocessCss(css, filename){
    return sass.renderSync({
      includePaths: [ `${ROOT}/node_modules`, STYLES ],
      data: css,
      importer: function(url, fileContent) {
        return { file: loaderUtils.urlToRequest(url) }
      }
    }).css;
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
