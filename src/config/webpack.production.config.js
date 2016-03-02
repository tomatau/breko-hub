import webpack from 'webpack'
import ExtractTextPlugin from 'extract-text-webpack-plugin'
import webpackConfig, { babelLoaderConfig } from 'config/webpack.base.config'
import { isomorphicPlugin } from 'server/isomorphicTools'
import autoprefixer from 'autoprefixer'
import cssnano from 'cssnano'

export default {
  ...webpackConfig,
  devtool: null,
  plugins: [
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
  postcss: [
    autoprefixer({ browsers: [ 'last 2 versions' ] }),
    cssnano(),
  ],
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
      ...babelLoaderConfig,
    }, ...webpackConfig.module.loaders ],
  },
}
