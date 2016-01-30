import webpack from 'webpack'
import ExtractTextPlugin from 'extract-text-webpack-plugin'
import CleanPlugin from 'clean-webpack-plugin'
import webpackConfig from 'config/webpack.base.config'
import { isomorphicPlugin } from 'server/isomorphicTools'
import autoprefixer from 'autoprefixer'

export default {
  ...webpackConfig,
  devtool: null,
  plugins: [
    new CleanPlugin([ webpackConfig.output.path ]),
    isomorphicPlugin,
    ...webpackConfig.plugins,
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        screw_ie8: true,
        warnings: false,
      },
    }),
  ],
  postcss: [ autoprefixer({ browsers: [ 'last 2 versions' ] }) ],
  module: {
    loaders: [ {
      test: /module\.s?css$/,
      include: [ /src\/app/ ],
      loader: ExtractTextPlugin.extract(
        'style',
        'css?modules&localIdentName=[path][name]-[local]' +
        '!postcss' +
        '!sass?outputStyle=compressed'
      ),
    }, {
      test: /\.s?css$/,
      include: [ /src\/app/ ],
      exclude: /module\.s?css$/,
      loader: ExtractTextPlugin.extract(
        'style', 'css!postcss!sass?outputStyle=compressed'
      ),
    }, {
      test: /\.(es6?|jsx?)$/,
      include: [ /src\/app/ ],
      loader: 'babel',
      query: {
        'presets': [ 'es2015', 'react', 'stage-0' ],
        'plugins': [
          'add-module-exports',
          'lodash',
          'react-require',
          'babel-root-import',
          'transform-decorators-legacy',
        ],
      },
    }, ...webpackConfig.module.loaders ],
  },
}
