import webpack from 'webpack'
import ExtractTextPlugin from 'extract-text-webpack-plugin'
import CleanPlugin from 'clean-webpack-plugin'
import webpackConfig from 'config/webpack.config'
import { isomorphicPlugin } from 'server/isomorphicTools'

export default {
  ...webpackConfig,
  devtool: null,
  plugins: [
    new CleanPlugin([ webpackConfig.output.path ]),
    isomorphicPlugin,
    ...webpackConfig.plugins,
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin(),
  ],
  module: {
    loaders: [ {
      test: /module\.s?css$/,
      include: [ /src\/app/ ],
      loader: ExtractTextPlugin.extract(
        'style',
        'css?modules&localIdentName=[path][name]-[local]' +
        '!sass?outputStyle=compressed'
      ),
    }, {
      test: /\.s?css$/,
      include: [ /src\/app/ ],
      exclude: /module\.s?css$/,
      loader: ExtractTextPlugin.extract(
        'style', 'css!sass?outputStyle=compressed'
      ),
    }, {
      test: /\.(es6?|jsx)$/,
      include: [ /src\/app/ ],
      loader: 'babel',
      query: {
        stage: 0,
        optional: [ 'runtime' ],
        'plugins': [
          'lodash',
          'react-require',
          'babel-root-import',
        ],
      },
    }, ...webpackConfig.module.loaders ],
  },
}
