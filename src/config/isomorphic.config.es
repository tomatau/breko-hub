import IsomorphicToolsPlugin from 'webpack-isomorphic-tools/plugin'
import { ASSET_FILE } from '~/src/config/paths'

export default {

  exclude: [ /node_modules/ ],

  webpack_assets_file_path: ASSET_FILE,

  assets: {
    images: {
      extensions: [
        'jpeg', 'jpg', 'png', 'gif', 'svg',
      ],
      parser: IsomorphicToolsPlugin.url_loader_parser,
    },
  },

}
