import '~/src/config/environment';
import koa from 'koa';
import webpack from 'webpack';
import webpackConfig from '~/src/config/webpack.config';

const compiler = webpack(webpackConfig)
const app = koa()

app.use(require('koa-webpack-dev-middleware')(compiler, {
  noInfo: true, publicPath: webpackConfig.output.publicPath
}))
app.use(require('koa-webpack-hot-middleware')(compiler));

app.use(function *(){
  this.response.body = `
    <!doctype html>
    <html lang='en'>
    <head>
      <meta charSet="UTF-8" />
      <script src="/head.js"></script>
    </head>
    <body>
      Template
      <script src="/body.js"></script>
    </body>
    </html>
  `
})

app.listen(process.env.PORT, () => {
  console.log(`Serving`, `http://localhost:${process.env.PORT}`)
})
