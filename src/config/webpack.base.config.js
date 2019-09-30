import webpack from 'webpack'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import { CleanWebpackPlugin } from 'clean-webpack-plugin'
import LoadablePlugin from '@loadable/webpack-plugin'
import {
  SRC, APP, STATIC, CONFIG, STYLES, SERVER, LOADABLE_FILE_NAME,
} from 'config/paths'
import svgoConfig from 'config/svgo.config'
import { isomorphicPlugin } from 'server/isomorphic-tools'

export default {
  entry: {
    // need 'main' first in list for development hot reloading
    // @loadable/components depends on entry named "main"
    main: [
      `${STYLES}/main.scss`,
      `${APP}/entry.js`,
    ],
    head: [
      `${APP}/head.js`,
    ],
    deferred: [
      `${APP}/utils/loadCSS.js`,
      `${STYLES}/deferred.scss`,
    ],
  },
  output: {
    path: STATIC,
    filename: '[name].[hash].js',
    chunkFilename: '[name].[hash].chunk.js',
    publicPath: '/',
  },
  resolve: {
    modules: [ SRC, STYLES, 'node_modules' ],
    extensions: [ '.js', '.scss' ],
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          name: 'head',
          reuseExistingChunk: true,
          minChunks: 2,
        },
      },
    },
  },
  plugins: [
    isomorphicPlugin,
    new CleanWebpackPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify(process.env.NODE_ENV),
        'DEBUG': JSON.stringify(process.env.DEBUG),
        'APP_ENV': JSON.stringify('browser'),
      },
    }),
    new MiniCssExtractPlugin({
      filename: '[name].[hash].css',
      allChunks: true,
    }),
    new LoadablePlugin({
      filename: LOADABLE_FILE_NAME,
      writeToDisk: true,
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
    babelrc: false,
    configFile: false,
    presets: [
      [
        '@babel/preset-env', {
          modules: false,
        },
      ],
      '@babel/preset-react',
    ],
    plugins: [
      '@loadable/babel-plugin',
      '@babel/plugin-syntax-dynamic-import',
      [ '@babel/plugin-transform-runtime', { modules: false } ],
      '@babel/plugin-proposal-export-default-from',
      '@babel/plugin-proposal-export-namespace-from',
      [ '@babel/plugin-proposal-decorators', { legacy: true } ],
      '@babel/plugin-proposal-class-properties',
      '@babel/plugin-proposal-object-rest-spread',
      'lodash',
      'ramda',
      [ 'provide-modules', {
        'debug': 'debug',
      } ],
    ],
  },
}
