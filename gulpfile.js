
var gulp = require('gulp');
var webpack = require('webpack');
var gulpWebpack = require('gulp-webpack');
var eslint = require('gulp-eslint');

gulp.task('build', ['webpack', 'webpack-min']);

var FILE_NAME = 'xcomponent';
var MODULE_NAME = 'xcomponent';

var WEBPACK_CONFIG = {
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel',
        query: {
          presets: ['es2015'],
          plugins: [
            'transform-object-rest-spread',
            'syntax-object-rest-spread',
            'transform-es3-property-literals',
            'transform-es3-member-expression-literals'
          ]
        }
      }
    ]
  },
  output: {
    filename: `${FILE_NAME}.js`,
    libraryTarget: 'umd',
    umdNamedDefine: true,
    library: MODULE_NAME
  },
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
    new webpack.optimize.UglifyJsPlugin({
      test: /\.js$/,
      minimize: true
    })
  ]
});

gulp.task('webpack', ['lint'], function() {
  return gulp.src('src/index.js')
      .pipe(gulpWebpack(WEBPACK_CONFIG))
      .pipe(gulp.dest('dist'));
});

gulp.task('webpack-min', ['lint'], function() {
  return gulp.src('src/index.js')
      .pipe(gulpWebpack(WEBPACK_CONFIG_MIN))
      .pipe(gulp.dest('dist'));
});

gulp.task('lint', function() {
  return gulp.src('src/**').pipe(eslint())
  .pipe(eslint.format())
  .pipe(eslint.failAfterError());
});