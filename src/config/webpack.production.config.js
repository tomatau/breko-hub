import webpack from 'webpack'
import ExtractTextPlugin from 'extract-text-webpack-plugin'
import webpackConfig, { babelLoaderConfig } from 'config/webpack.base.config'

export default {
  ...webpackConfig,
  devtool: null,
  plugins: [
    ...webpackConfig.plugins,
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        screw_ie8: true,
        warnings: false,
      },
    }),
  ],
  module: {
    loaders: [ {
      test: /module\.s?css$/,
      include: [ /src\/app/, /src\/styles/ ],
      loader: ExtractTextPlugin.extract(
        'style',
        'css?modules&localIdentName=[path][name]-[local]' +
        '!postcss' +
        '!sass?outputStyle=compressed'
      ),
    }, {
      test: /\.s?css$/,
      include: [ /src\/app/, /src\/styles/ ],
      exclude: /module\.s?css$/,
      loader: ExtractTextPlugin.extract(
        'style', 'css!postcss!sass?outputStyle=compressed'
      ),
    }, {
      ...babelLoaderConfig,
    }, ...webpackConfig.module.loaders ],
  },
}
