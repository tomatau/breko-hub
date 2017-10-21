import webpack from 'webpack'
import ExtractTextPlugin from 'extract-text-webpack-plugin'
import webpackConfig, { babelLoaderConfig } from 'config/webpack.base.config'
import { SRC } from 'config/paths'

export default {
  ...webpackConfig,
  entry: {
    ...webpackConfig.entry,
    head: [
      ...webpackConfig.entry.head,
      'webpack-hot-middleware/client',
    ],
    body: [
      'react-hot-loader/patch',
      ...webpackConfig.entry.body,
    ],
  },
  devtool: '#cheap-module-eval-source-map',
  plugins: [
    ...webpackConfig.plugins,
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
  ],
  module: {
    rules: [ ...webpackConfig.module.rules, {
      test: /module\.s?css$/,
      include: [ SRC ],
      // not extracting css-modules in development for hot-reloading
      use: [
        { loader: 'style-loader' },
        { loader: 'css-loader',
          options: { modules: true, localIdentName: '[path][name]-[local]' } },
        { loader: 'postcss-loader' },
        { loader: 'sass-loader',
          options: { outputStyle: 'expanded' } },
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
          { loader: 'sass-loader', options: { outputStyle: 'expanded' } },
        ],
      }),
    }, {
      ...babelLoaderConfig,
      use: [
        { loader: 'react-hot-loader/webpack' },
        ...babelLoaderConfig.use,
      ],
    } ],
  },
}
