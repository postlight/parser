module.exports = function (config) {
  config.set({

    basePath: '',

    frameworks: ['jasmine', 'browserify'],
    files: [
      { pattern: 'src/**/*.test.js', included: true },
    ],

    exclude: [],

    preprocessors: {
      'src/**/*.js': ['browserify'],
    },

    browserify: {
      debug: true,
      transform: ['babelify', 'brfs'],
    },

    reporters: ['progress'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: false,
    browsers: ['Chrome'],
    singleRun: true,
    concurrency: Infinity,
  });
};
