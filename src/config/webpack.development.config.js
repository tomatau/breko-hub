import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import webpackConfig, { babelLoaderConfig } from 'config/webpack.base.config'
import { SRC } from 'config/paths'

export default {
  ...webpackConfig,
  mode: 'development',
  devtool: '#cheap-module-eval-source-map',
  resolve: {
    ...webpackConfig.resolve,
    alias: {
      'react-dom': '@hot-loader/react-dom',
    },
  },
  module: {
    rules: [
      ...webpackConfig.module.rules,
      {
        test: /module\.s?css$/,
        include: [ SRC ],
        // not extracting css-modules in development for hot-reloading
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader',
            options: {
              modules: {
                localIdentName: '[path][name]-[local]',
              },
            },
          },
          { loader: 'postcss-loader' },
          {
            loader: 'sass-loader',
            options: {
              sassOptions: {
                outputStyle: 'expanded',
              },
            },
          },
        ],
      }, {
        test: /\.s?css$/,
        include: [ SRC ],
        exclude: /module\.s?css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          {
            loader: 'sass-loader',
            options: {
              sassOptions: {
                outputStyle: 'expanded',
              },
            },
          },
        ],
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
      },
    ],
  },
}
