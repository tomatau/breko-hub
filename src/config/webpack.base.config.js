import webpack from 'webpack'
import ExtractTextPlugin from 'extract-text-webpack-plugin'
import CleanPlugin from 'clean-webpack-plugin'
import { ReactLoadablePlugin } from 'react-loadable/webpack'
import {
  SRC, APP, STATIC, CONFIG, STYLES, SERVER, ROOT, LOADABLE,
} from 'config/paths'
import svgoConfig from 'config/svgo.config'
import { isomorphicPlugin } from 'server/isomorphic-tools'

export default {
  entry: {
    head: [
      `${APP}/utils/loadCSS.js`,
    ],
    body: [
      'babel-polyfill',
      `${STYLES}/main.scss`,
      `${APP}/entry.js`,
    ],
  },
  output: {
    path: STATIC,
    filename: '[name].[hash].js',
    publicPath: '/',
  },
  resolve: {
    modules: [ SRC, STYLES, 'node_modules' ],
    extensions: [
      '.js', '.jsx', '.scss',
    ],
  },
  plugins: [
    isomorphicPlugin,
    new webpack.NoEmitOnErrorsPlugin(),
    new CleanPlugin([ 'src/static' ], {
      root: ROOT,
    }),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify(process.env.NODE_ENV),
        'DEBUG': JSON.stringify(process.env.DEBUG),
        'APP_ENV': JSON.stringify('browser'),
      },
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'head',
    }),
    new ExtractTextPlugin({
      filename: '[name].[hash].css',
      allChunks: true,
    }),
    new ReactLoadablePlugin({
      filename: LOADABLE,
    }),
  ],
  module: {
    rules: [
      {
        test: isomorphicPlugin.regular_expression('images'),
        loader: 'url-loader',
        options: { limit: 10240 },
      }, {
        test: /\.woff2?(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url-loader',
        options: { limit: 10000, mimetype: 'application/font-woff' },
      }, {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url-loader',
        options: { limit: 10000, mimetype: 'application/octet-stream' },
      }, {
        test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'file-loader',
      }, {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: 'svg-inline-loader',
            options: { removeTags: false, removeSVGTagAttrs: false },
          }, {
            loader: 'svgo-loader',
            options: svgoConfig,
          },
        ],
      },
    ],
  },
}

export const babelLoaderConfig = {
  test: /\.jsx?$/,
  include: [ APP, CONFIG, SERVER ],
  loader: 'babel-loader',
  options: {
    presets: [
      [ 'env', {
        targets: { browsers: [ 'last 2 versions' ] },
        modules: false,
      } ],
      'react',
    ],
    plugins: [
      'dynamic-import-webpack',
      'transform-export-extensions',
      'transform-decorators-legacy',
      'transform-class-properties',
      'transform-object-rest-spread',
      'add-module-exports',
      'lodash',
      'ramda',
      'react-require',
      [ 'provide-modules', {
        'debug': 'debug',
      } ],
      'babel-root-import',
    ],
  },
}
