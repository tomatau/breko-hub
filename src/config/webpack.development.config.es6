import webpack from 'webpack';
import IsomorphicToolsPlugin from 'webpack-isomorphic-tools/plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import isomorphicConfig from '~/src/config/isomorphic.config';
import webpackConfig from './webpack.config';

export default {
  ...webpackConfig,
  devtool: 'cheap-module-eval-source-map',
  entry: {
    ...webpackConfig.entry,
    head: [
      ...webpackConfig.entry.head,
      'webpack-hot-middleware/client',
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new IsomorphicToolsPlugin(isomorphicConfig).development(),
    ...webpackConfig.plugins,
  ],
  module: {
    loaders: [{
        test: /module\.s?css$/,
        include: [/src\/app/],
        loaders: [
          'style',
          'css?modules&localIdentName=[path][name]-[local]',
          'sass'
        ]
      }, {
        test: /\.s?css$/,
        include: [/src\/app/],
        exclude: /module\.s?css$/,
        loader: ExtractTextPlugin.extract(
          'style', 'css!sass'
        )
      }, {
        test: /\.es6$/,
        include: [/src\/app/],
        loader: 'babel',
        query: {
          stage: 0,
          optional: ["runtime"],
          "plugins": [
            "babel-root-import",
            "react-transform",
          ],
          "extra": {
            "react-transform": {
              "transforms": [{
                "transform": "react-transform-hmr",
                "imports": ["react"],
                "locals": ["module"]
              }, {
                "transform": "react-transform-catch-errors",
                "imports": ["react", "redbox-react"]
              }]
            }
          }
        }
      },
      ...webpackConfig.module.loaders,
    ]
  }
}
