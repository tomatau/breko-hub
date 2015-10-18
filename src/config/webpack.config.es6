import webpack from 'webpack';
import IsomorphicToolsPlugin from 'webpack-isomorphic-tools/plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import isomorphicConfig from '~/src/config/isomorphic.config';
import {APP, STATIC} from '~/src/config/paths';

export default {
  devtool: 'cheap-module-eval-source-map',
  entry: {
    head: [
      'webpack-hot-middleware/client',
    ],
    body: [
      `${APP}/entry.es6`
    ]
  },
  output: {
    path: STATIC,
    filename: '[name].[hash].js',
    publicPath: '/'
  },
  resolve: {
    root: APP,
    modulesDirectories: [ 'node_modules' ],
    extensions: [
      '', '.js', '.jsx', '.es6'
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new IsomorphicToolsPlugin(isomorphicConfig).development(),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
      }
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: "head"
    }),
    new ExtractTextPlugin("[name].[hash].css",{
      allChunks: true
    }),
  ],
  module: {
    loaders: [{
      test: /.*\.(gif|png|jpe?g|svg)$/i,
      loader: 'file'
    }, {
      test: /module\.s?css$/,
      include: [/src\/app/],
      loaders: [
        'style',
        'css?modules&localIdentName=[path][name]-[local]!sass'
      ]
    }, {
      test: /\.s?css$/,
      include: [/src\/app/],
      exclude: /module\.s?css$/,
      loader: ExtractTextPlugin.extract(
        'style',
        'css!sass'
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
    }]
  }
}
