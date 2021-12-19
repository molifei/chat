module.exports = {
  plugin: [
    [
      '@babel/plugin-proposal-decorators',
      {
        legacy: true
      }
    ],
    'transform-class-properties'
  ],
  'presets': [
    'react-app',
    '@babel/preset-env'
  ]
}