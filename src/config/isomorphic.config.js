import { ASSET_FILE } from 'config/paths'

export default {

  webpack_assets_file_path: ASSET_FILE,

  assets: {
    images: {
      extensions: [
        'jpeg', 'jpg', 'png', 'gif', 'svg',
      ],
    },
    fonts: {
      extensions: [
        'woff', 'ttf', 'woff2', 'eot',
      ],
    },
  },

}
