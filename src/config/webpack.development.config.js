import webpack from 'webpack'
import ExtractTextPlugin from 'extract-text-webpack-plugin'
import webpackConfig, { babelLoaderConfig } from 'config/webpack.base.config'
import { isomorphicPlugin } from 'server/isomorphicTools'
import autoprefixer from 'autoprefixer'
import cssnano from 'cssnano'

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
  postcss: [
    autoprefixer({ browsers: [ 'last 2 versions' ] }),
    cssnano(),
  ],
  module: {
    loaders: [ {
      test: /module\.s?css$/,
      include: [ /src\/app/ ],
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
      include: [ /src\/app/ ],
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
    }, ...webpackConfig.module.loaders ],
  },
}
