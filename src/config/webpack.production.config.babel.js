import 'config/environment'
import 'helpers/cleanAssetJson'
import webpack from 'webpack'
import ExtractTextPlugin from 'extract-text-webpack-plugin'
import webpackConfig, { babelLoaderConfig } from 'config/webpack.base.config'
import { APP, STYLES } from 'config/paths'

export default {
  ...webpackConfig,
  devtool: false,
  plugins: [
    ...webpackConfig.plugins,
    new webpack.LoaderOptionsPlugin({
      minimize: true,
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        screw_ie8: true,
        warnings: false,
      },
    }),
  ],
  module: {
    rules: [ ...webpackConfig.module.rules, {
      test: /module\.s?css$/,
      include: [ APP, STYLES ],
      loader: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: [
          { loader: 'css-loader',
            options: {
              modules: true, localIdentName: '[path][name]-[local]',
            } },
          'postcss-loader',
          { loader: 'sass-loader', options: { outputStyle: 'compressed' } },
        ],
      }),
    }, {
      test: /\.s?css$/,
      include: [ APP, STYLES ],
      exclude: /module\.s?css$/,
      loader: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: [
          'css-loader',
          'postcss-loader',
          { loader: 'sass-loader', options: { outputStyle: 'compressed' } },
        ],
      }),
    }, {
      ...babelLoaderConfig,
    } ],
  },
}
