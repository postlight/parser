module.exports = function (config) {
  config.set({

    basePath: '',

    frameworks: ['jasmine', 'browserify'],

    files: [
      './node_modules/phantomjs-polyfill-find/find-polyfill.js',
      './node_modules/phantomjs-polyfill-string-includes/index.js',
      { pattern: 'src/**/*.test.js', included: true },
    ],

    exclude: [
    ],

    preprocessors: {
      'src/**/*.js': ['browserify'],
    },

    browserify: {
      debug: true,
      transform: [
        'brfs-babel',
        'babelify',
      ],
    },

    reporters: ['progress'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: false,
    browsers: [(process.env.CI ? 'PhantomJS' : 'Chrome')],
    singleRun: true,
    concurrency: Infinity,
  });
};
