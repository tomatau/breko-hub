import 'config/environment'
import 'helpers/clean-asset-json'
import webpack from 'webpack'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import webpackConfig, { babelLoaderConfig } from 'config/webpack.base.config'
import { APP, STYLES } from 'config/paths'

export default {
  ...webpackConfig,
  mode: 'production',
  devtool: false,
  plugins: [
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false,
    }),
    ...webpackConfig.plugins,
  ],
  module: {
    rules: [
      ...webpackConfig.module.rules,
      {
        test: /module\.s?css$/,
        include: [ APP, STYLES ],
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              modules: {
                localIdentName: '[path][name]-[local]',
              },
            },
          },
          'postcss-loader',
          {
            loader: 'sass-loader',
            options: {
              sassOptions: {
                outputStyle: 'compressed',
              },
            },
          },
        ],
      }, {
        test: /\.s?css$/,
        include: [ APP, STYLES ],
        exclude: /module\.s?css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          {
            loader: 'sass-loader',
            options: {
              sassOptions: {
                outputStyle: 'compressed',
              },
            },
          },
        ],
      }, {
        ...babelLoaderConfig,
      },
    ],
  },
}
