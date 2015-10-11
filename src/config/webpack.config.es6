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
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
      }
    }),
  ],
}
