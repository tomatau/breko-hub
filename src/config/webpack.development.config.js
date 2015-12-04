import webpack from 'webpack'
import ExtractTextPlugin from 'extract-text-webpack-plugin'
import webpackConfig from 'config/webpack.base.config'
import { isomorphicPlugin } from 'server/isomorphicTools'
import autoprefixer from 'autoprefixer'

export default {
  ...webpackConfig,
  entry: {
    ...webpackConfig.entry,
    head: [
      ...webpackConfig.entry.head,
      'webpack-hot-middleware/client',
    ],
  },
  devtool: 'cheap-module-eval-source-map',
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    isomorphicPlugin,
    ...webpackConfig.plugins,
  ],
  postcss: [ autoprefixer({ browsers: [ 'last 2 versions' ] }) ],
  module: {
    loaders: [ {
      test: /module\.s?css$/,
      include: [ /src\/app/ ],
      loaders: [
        'style',
        'css' +
          '?modules' +
          '&localIdentName=[path][name]-[local]',
        'postcss',
        'sass' +
          '?outputStyle=expanded',
      ],
    }, {
      test: /\.s?css$/,
      include: [ /src\/app/ ],
      exclude: /module\.s?css$/,
      loader: ExtractTextPlugin.extract(
        'style', 'css!postcss!sass?outputStyle=expanded'
      ),
    }, {
      test: /\.(es6?|jsx?)$/,
      include: [ /src\/app/, /test/ ],
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
