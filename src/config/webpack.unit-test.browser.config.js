import webpack from 'webpack'
import path from 'path'
import glob from 'glob'
import ExtractTextPlugin from 'extract-text-webpack-plugin'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import webpackConfig, { babelLoaderConfig } from 'config/webpack.base.config'
import { TESTS, ROOT, SRC } from 'config/paths'

export default {
  ...webpackConfig,
  entry: {
    main: [
      // HMR seems to ignore tests that aren't replaced on a replacement
      // refresh page works fine though
      'babel-polyfill',
      `mocha-loader!${TESTS}/test-setup.js`,
      ...glob.sync('./src/**/*.spec.js').map(file =>
        `mocha-loader!${path.join(ROOT, file)}`
      ),
    ],
  },
  devtool: '#cheap-module-eval-source-map',
  externals: {
    'cheerio': 'window',
    'react/lib/ExecutionEnvironment': true,
    'react/lib/ReactContext': true,
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('TEST'),
        'DEBUG': JSON.stringify(process.env.DEBUG),
        'APP_ENV': JSON.stringify('browser'),
      },
    }),
    new ExtractTextPlugin({
      filename: '[name].[hash].css',
      allChunks: true,
    }),
    new webpack.IgnorePlugin(/ReactContext|react\/addons/), // skin-deep
    new HtmlWebpackPlugin(),
  ],
  resolve: {
    ...webpackConfig.resolve,
    alias: {
      'koa-body': path.join(TESTS, 'stubs/koaBody'),
      'fs': path.join(TESTS, 'stubs/fs'),
      'net': path.join(TESTS, 'stubs/net'),
      'http': path.join(TESTS, 'stubs/http'),
      'chai-jest-snapshot': path.join(TESTS, 'stubs/chai-jest-snapshot'),
    },
    extensions: [
      ...webpackConfig.resolve.extensions,
      '.json',
    ],
  },
  module: {
    rules: [ ...webpackConfig.module.rules, {
      test: /module\.s?css$/,
      include: [ SRC ],
      use: [
        { loader: 'style-loader' },
        { loader: 'css-loader',
          options: {
            modules: {
              localIdentName: '[path][name]-[local]',
            },
          },
        },
        { loader: 'sass-loader' },
      ],
    }, {
      test: /\.s?css$/,
      include: [ SRC ],
      exclude: /module\.s?css$/,
      loader: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: [
          'css-loader',
          'postcss-loader',
          'sass-loader',
        ],
      }),
    }, {
      ...babelLoaderConfig,
      options: {
        ...babelLoaderConfig.options,
        plugins: [
          ...babelLoaderConfig.options.plugins,
          'extract-hoc/babel',
          'react-hot-loader/babel',
        ],
      },
    } ],
  },
}
