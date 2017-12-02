import { ASSET_FILE } from 'config/paths'

export default {
  webpack_assets_file_path: ASSET_FILE,
  assets: {
    images: {
      extensions: [
        'jpeg', 'jpg', 'png', 'gif',
      ],
    },
    fonts: {
      extensions: [
        'woff', 'ttf', 'woff2', 'eot',
      ],
    },
    asset_type: {
      extension: 'svg',
      parser(module) {
        if (module.source) {
          const regex = /module\.exports = "((.|\n)*)"/
          const match = module.source.match(regex)
          return (match ? match[1] : '').replace(/\\/g, '')
        }
      },
    },
  },
}
