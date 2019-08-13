module.exports = {
  'presets': [
    [
      '@babel/preset-env', {
        'targets': { 'node': true },
      },
    ],
    '@babel/preset-react',
  ],
  'plugins': [
    '@loadable/babel-plugin',
    '@babel/plugin-syntax-dynamic-import',
    'dynamic-import-node',
    '@babel/plugin-proposal-export-default-from',
    '@babel/plugin-proposal-export-namespace-from',
    [ '@babel/plugin-proposal-decorators', { legacy: true } ],
    '@babel/plugin-proposal-class-properties',
    '@babel/plugin-proposal-object-rest-spread',
    [ 'provide-modules', { 'debug': 'debug' } ],
    [ 'module-resolver', { 'root': [ './src' ] } ],
  ],
}
