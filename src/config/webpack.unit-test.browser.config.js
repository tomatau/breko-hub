import webpack from 'webpack'
import path from 'path'
import glob from 'glob'
import ExtractTextPlugin from 'extract-text-webpack-plugin'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import webpackConfig from 'config/webpack.base.config'
import { TESTS, ROOT } from 'config/paths'
import { isomorphicPlugin } from 'server/isomorphicTools'

export default {
  ...webpackConfig,
  devtool: 'cheap-module-eval-source-map',
  entry: {
    main: [
      'babel-polyfill',
      // HMR seems to ignore tests that aren't replaced on a replacement
      // refresh page works fine though
      `mocha!${TESTS}/index.js`,
      ...glob.sync('./{src,test}/**/*.test.js').map(file =>
        `mocha!${path.join(ROOT, file)}`
      ),
      'webpack-hot-middleware/client',
    ],
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.IgnorePlugin(/ReactContext/), // skin-deep
    isomorphicPlugin,
    ...webpackConfig.plugins,
    new HtmlWebpackPlugin(),
  ],
  resolve: {
    ...webpackConfig.resolve,
    modulesDirectories: [ 'node_modules', TESTS ],
    alias: {
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
      test: /\.(es6?|jsx?)$/,
      include: [ /src/, /test/ ],
      loader: 'babel',
      query: {
        'presets': [ 'es2015', 'react', 'stage-0' ],
        'plugins': [
          'add-module-exports',
          'lodash',
          [ 'provide-modules', {
            'debug': 'debug',
            'react': {
              'default': 'React',
              'destructured': [ 'PropTypes' ],
            },
          } ],
          'babel-root-import',
          'transform-decorators-legacy',
          [ 'react-transform', {
            'transforms': [ {
              'transform': 'react-transform-hmr',
              'imports': [ 'react' ],
              'locals': [ 'module' ],
            }, {
              'transform': 'react-transform-catch-errors',
              'imports': [ 'react', 'redbox-react' ],
            } ],
          } ],
        ],
      },
    }, ...webpackConfig.module.loaders ],
  },
}
