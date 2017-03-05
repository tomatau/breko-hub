import webpack from 'webpack'
import path from 'path'
import glob from 'glob'
import ExtractTextPlugin from 'extract-text-webpack-plugin'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import webpackConfig, { babelLoaderConfig } from 'config/webpack.base.config'
import { TESTS, ROOT } from 'config/paths'
import { isomorphicPlugin } from 'server/isomorphicTools'

export default {
  ...webpackConfig,
  devtool: '#cheap-module-eval-source-map',
  entry: {
    main: [
      // HMR seems to ignore tests that aren't replaced on a replacement
      // refresh page works fine though
      'babel-polyfill',
      `mocha-loader!${TESTS}/test-setup.js`,
      ...glob.sync('./src/**/*.test.js').map(file =>
        `mocha-loader!${path.join(ROOT, file)}`
      ),
      'webpack-hot-middleware/client',
    ],
  },
  externals: {
    'cheerio': 'window',
    'react/lib/ExecutionEnvironment': true,
    'react/lib/ReactContext': true,
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.IgnorePlugin(/ReactContext|react\/addons/), // skin-deep
    isomorphicPlugin,
    ...webpackConfig.plugins,
    new HtmlWebpackPlugin(),
  ],
  resolve: {
    ...webpackConfig.resolve,
    alias: {
      'koa-body': path.join(TESTS, 'stubs/koaBody'),
      'fs': path.join(TESTS, 'stubs/fs'),
      'net': path.join(TESTS, 'stubs/net'),
    },
  },
  module: {
    rules: [ ...webpackConfig.module.rules, {
      test: /module\.s?css$/,
      include: [ /src\/app/, /src\/styles/ ],
      use: [
        { loader: 'style-loader' },
        { loader: 'css-loader',
          options: { modules: true, localIdentName: '[path][name]-[local]' } },
        { loader: 'sass-loader' },
      ],
    }, {
      test: /\.s?css$/,
      include: [ /src\/app/, /src\/styles/ ],
      exclude: /module\.s?css$/,
      loader: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: [
          'css-loader',
          'sass-loader',
        ],
      }),
    }, {
      ...babelLoaderConfig,
      include: [ /src/, /test/ ],
      options: {
        ...babelLoaderConfig.options,
        'plugins': [
          ...babelLoaderConfig.options.plugins,
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
    } ],
  },
}
