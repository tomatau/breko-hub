import IsomorphicToolsPlugin from 'webpack-isomorphic-tools/plugin'

export default {

  exclude: [ /node_modules/ ],

  assets: {
    images: {
      extensions: [
        'jpeg', 'jpg', 'png', 'gif', 'svg',
      ],
      parser: IsomorphicToolsPlugin.url_loader_parser,
    },
  },

}
