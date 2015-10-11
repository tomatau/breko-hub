import webpack from 'webpack';
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
    filename: '[name].js',
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
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
      }
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: "head"
    }),
  ],
  module: {
    loaders: [{
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
      },
      test: /\.es6$/,
      include: [/src\/app/],
      loader: 'babel'
    }]
  }
}
