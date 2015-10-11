import '~/src/config/environment';
import koa from 'koa';
import mount from 'koa-mount';
import webpack from 'webpack';
import webpackConfig from '~/src/config/webpack.config';
import server from '~/src/server';
import log from 'npmlog';

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
app.use(require('koa-webpack-hot-middleware')(compiler));

app.use(mount(server))

app.listen(process.env.PORT, () => {
  log.info(`Serving`, `http://localhost:${process.env.PORT}`)
})
