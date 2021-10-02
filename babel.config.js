module.exports = {
  presets: [
    ['@babel/preset-env', { targets: { node: 'current' } }],
    '@babel/preset-typescript',
  ],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        alias: {
          './utils': 'utils',
          './cleaners': 'cleaners',
          './resource': 'resource',
          './extractors': 'extractors',
          './test-helpers.js': 'test-helpers',
          './mercury.js': 'mercury',
        },
      },
    ],
    [
      '@babel/plugin-transform-runtime',
      {
        regenerator: true,
      },
    ],
  ],
};
