// This file ensures JSDOM is loaded before React is included
const nhf = require('node-hook-filename')

delete process.env.DEBUG
process.env.NODE_ENV = 'test'
process.env.CONFIG_ENV = 'test'

require('@babel/register')({
  ignore: [
    /node_modules/,
  ],
  only: [
    /\/src\/app/,
    /\/src\/config/,
    /\/src\/helpers/,
    /\/src\/server/,
    /\/test\//,
  ],
})

require('../src/helpers/css-modules-hook')
require('./stubs/global-jsdom')

const loadableRegex = /loadable-stats\.json/
const stubLoadableStats = {
  // assetsByChunkName: { main: [] },
  // entrypoints: { main: {} },
  publicPath: '/',
  outputPath: '/dist',
  namedChunkGroups: {
    main: {
      assets: [
        'test-main-asset.css',
        'test-main-asset.js',
      ],
      childAssets: {},
    },
  },
}

nhf(
  [ /\.svg/, /\.jpg/, /\.jpeg/, loadableRegex ],
  (request, parent) =>
    loadableRegex.test(request)
      ? stubLoadableStats
      : nhf.normalize(request, parent)
)
