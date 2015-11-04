import webpack from 'webpack'
import path from 'path'
import IsomorphicToolsPlugin from 'webpack-isomorphic-tools/plugin'
import ExtractTextPlugin from 'extract-text-webpack-plugin'
import isomorphicConfig from '~/src/config/isomorphic.config'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import webpackConfig from './webpack.config'
import { TESTS } from '~/src/config/paths'

export default {
  ...webpackConfig,
  devtool: 'cheap-module-eval-source-map',
  entry: {
    main: [
      // require glob of all test files ?
      // or do manual requires in index.es6
      `mocha!${TESTS}/index.es6`,
      'webpack-hot-middleware/client',
    ],
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new IsomorphicToolsPlugin(isomorphicConfig).development(),
    ...webpackConfig.plugins,
    new HtmlWebpackPlugin(),
  ],
  resolve: {
    ...webpackConfig.resolve,
    modulesDirectories: [ 'node_modules', TESTS ],
    alias: {
      'npmlog': path.join(TESTS, 'stubs/npmlog'),
      'koa-body': path.join(TESTS, 'stubs/koaBody'),
      'fs': path.join(TESTS, 'stubs/fs'),
    },
  },
  module: {
    loaders: [ {
      test: /module\.s?css$/,
      include: [ /src/ ],
      loaders: [
        'style',
        'css?modules&localIdentName=[path][name]-[local]',
        'sass',
      ],
    }, {
      test: /\.s?css$/,
      include: [ /src/ ],
      exclude: /module\.s?css$/,
      loader: ExtractTextPlugin.extract(
        'style', 'css!sass'
      ),
    }, {
      test: /\.es6$/,
      include: [ /src/, /test/ ],
      loader: 'babel',
      query: {
        stage: 0,
        optional: [ 'runtime' ],
        'plugins': [
          'lodash',
          'react-require',
          'babel-root-import',
          'react-transform',
        ],
        'extra': {
          'react-transform': {
            'transforms': [ {
              'transform': 'react-transform-hmr',
              'imports': [ 'react' ],
              'locals': [ 'module' ],
            }, {
              'transform': 'react-transform-catch-errors',
              'imports': [ 'react', 'redbox-react' ],
            } ],
          },
        },
      },
    }, ...webpackConfig.module.loaders ],
  },
}
