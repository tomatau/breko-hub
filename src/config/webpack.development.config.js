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
