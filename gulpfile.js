
var gulp = require('gulp');
var webpack = require('webpack');
var gulpWebpack = require('webpack-stream');
var eslint = require('gulp-eslint');
var Server = require('karma').Server;
var argv = require('yargs').argv;
var UglifyJSPlugin = require('uglifyjs-webpack-plugin');

gulp.task('build', ['karma', 'webpack', 'webpack-min']);

var FILE_NAME = 'xcomponent';
var MODULE_NAME = 'xcomponent';

var WEBPACK_CONFIG = {
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(dist)/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015'],
          plugins: [
            'transform-object-rest-spread',
            'syntax-object-rest-spread',
            'transform-es3-property-literals',
            'transform-es3-member-expression-literals',
            ['transform-es2015-for-of', {loose: true}],
            'transform-decorators-legacy'
          ]
        }
      },
      {
        test: /\.(html?|css)$/,
        loader: 'raw-loader'
      }
    ]
  },
  output: {
    filename: `${FILE_NAME}.js`,
    libraryTarget: 'umd',
    umdNamedDefine: true,
    library: MODULE_NAME,
    pathinfo: true
  },
  plugins: [
    new webpack.DefinePlugin({
        __TEST__: false
    }),
    new webpack.SourceMapDevToolPlugin({
        filename: '[file].map'
    })
  ],
  bail: true
};

var WEBPACK_CONFIG_MIN = Object.assign({}, WEBPACK_CONFIG, {
  output: {
    filename: `${FILE_NAME}.min.js`,
    libraryTarget: 'umd',
    umdNamedDefine: true,
    library: MODULE_NAME
  },
  plugins: [
    new webpack.SourceMapDevToolPlugin({
        filename: '[file].map'
    }),
    new UglifyJSPlugin({
      test: /\.js$/,
      minimize: true,
      sourceMap: true
    }),
    new webpack.DefinePlugin({
        __TEST__: false
    })
  ]
});

gulp.task('webpack', ['lint'], function() {
  return gulp.src('src/index.js')
      .pipe(gulpWebpack(WEBPACK_CONFIG, webpack))
      .pipe(gulp.dest('dist'));
});

gulp.task('webpack-min', ['lint'], function() {
  return gulp.src('src/index.js')
      .pipe(gulpWebpack(WEBPACK_CONFIG_MIN, webpack))
      .pipe(gulp.dest('dist'));
});

gulp.task('lint', function() {
  return gulp.src([ 'src/**/*.js', 'test/tests/**/*.js' ]).pipe(eslint())
  .pipe(eslint.format())
  .pipe(eslint.failAfterError());
});

gulp.task('karma', ['lint'], function (done) {

  var server = new Server({
    configFile: __dirname + '/karma.conf.js',
    singleRun: !Boolean(argv['keep-browser-open']),
    client: {
      captureConsole: Boolean(argv['capture-console'])
    }
  });

  server.on('browser_error', function (browser, err) {
    console.log('Karma Run Failed: ' + err.message);
    throw err;
  });

  server.on('run_complete', function (browsers, results) {
    if (results.failed) {
      return done(new Error('Karma: Tests Failed'));
    }
    done();
  });

  server.start();
});

gulp.task('test', ['karma']);
