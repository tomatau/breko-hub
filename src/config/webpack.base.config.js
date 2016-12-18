import webpack from 'webpack'
import ExtractTextPlugin from 'extract-text-webpack-plugin'
import CleanPlugin from 'clean-webpack-plugin'
import { SRC, APP, STATIC, STYLES, ROOT } from 'config/paths'
import { isomorphicPlugin } from 'server/isomorphicTools'
import autoprefixer from 'autoprefixer'
import cssnano from 'cssnano'

export default {
  entry: {
    head: [
      `${APP}/utils/loadCSS.js`,
    ],
    body: [
      'babel-polyfill',
      `${APP}/entry.js`,
      `${STYLES}/main.scss`,
    ],
  },
  output: {
    path: STATIC,
    filename: '[name].[hash].js',
    publicPath: '/',
  },
  resolve: {
    root: [ SRC, STYLES ],
    modulesDirectories: [ 'node_modules' ],
    extensions: [
      '', '.js', '.jsx', '.es', '.es6', '.scss',
    ],
  },
  postcss: [
    autoprefixer({ browsers: [ 'last 2 versions' ] }),
    cssnano(),
  ],
  plugins: [
    isomorphicPlugin,
    new webpack.NoErrorsPlugin(),
    new CleanPlugin([ 'src/static' ], {
      root: ROOT,
    }),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify(process.env.NODE_ENV),
        'DEBUG': JSON.stringify(process.env.DEBUG),
      },
    }),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'head',
    }),
    new ExtractTextPlugin('[name].[hash].css',{
      allChunks: true,
    }),
  ],
  module: {
    loaders: [ {
      test: isomorphicPlugin.regular_expression('images'),
      loader: 'url-loader?limit=10240',
    }, {
      test: /\.woff2?(\?v=\d+\.\d+\.\d+)?$/,
      loader: 'url?limit=10000&mimetype=application/font-woff',
    }, {
      test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
      loader: 'url?limit=10000&mimetype=application/octet-stream',
    }, {
      test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
      loader: 'file',
    }, {
      test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
      loader: 'url?limit=10000&mimetype=image/svg+xml',
    }, {
      test: /\.json$/i,
      loader: 'json',
    } ],
  },
}

export const babelLoaderConfig = {
  test: /\.jsx?$/,
  include: [ /src\/app/, /src\/config/, /src\/server/ ],
  loader: 'babel',
  query: {
    'presets': [ 'es2015', 'react', 'stage-0' ],
    'plugins': [
      'add-module-exports',
      'lodash',
      'ramda',
      'react-require',
      [ 'provide-modules', {
        'debug': 'debug',
      } ],
      'babel-root-import',
      'transform-decorators-legacy',
    ],
  },
}
