import webpack from 'webpack'
import ExtractTextPlugin from 'extract-text-webpack-plugin'
import webpackConfig, { babelLoaderConfig } from 'config/webpack.base.config'

export default {
  ...webpackConfig,
  entry: {
    ...webpackConfig.entry,
    head: [
      ...webpackConfig.entry.head,
      'webpack-hot-middleware/client',
    ],
  },
  devtool: '#cheap-module-eval-source-map',
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    ...webpackConfig.plugins,
  ],
  module: {
    loaders: [ ...webpackConfig.module.loaders, {
      test: /module\.s?css$/,
      include: [ /\/src\// ],
      // not extracting css-modules in development for hot-reloading
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
      include: [ /src\/app/, /src\/styles/ ],
      exclude: /module\.s?css$/,
      loader: ExtractTextPlugin.extract(
        'style', 'css!postcss!sass?outputStyle=expanded'
      ),
    }, {
      ...babelLoaderConfig,
      query: {
        ...babelLoaderConfig.query,
        'plugins': [
          ...babelLoaderConfig.query.plugins,
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
    } ],
  },
}
