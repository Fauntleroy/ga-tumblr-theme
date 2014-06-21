const LESS_SRC_PATH = './src/css';
const LESS_SRC_FILE = './src/css/index.less';
const JS_SRC_FILE = './src/js/index.js';
const HTML_SRC_FILE = './src/index.html';
const COMPILED_PATH = './dist';
const COMPILED_ASSETS_FILES = COMPILED_PATH +'/{index.css|index.js|index.html}';

var path = require('path');
var vinyl_source = require('vinyl-source-stream');
var watchify = require('watchify');
var gulp = require('gulp');
var gulp_less = require('gulp-less');
var gulp_smoosher = require('gulp-smoosher');

gulp.task( 'compile css', function(){
	return gulp.src( LESS_SRC_FILE )
		.pipe( gulp_less({
			paths: [ path.join( __dirname, LESS_SRC_PATH ) ]
		}))
		.pipe( gulp.dest( COMPILED_PATH ) );
});

gulp.task( 'compile js', function(){
	var w = watchify( JS_SRC_FILE );
	var bundle = function(){
		return w.bundle()
			.pipe( vinyl_source('index.js') )
			.pipe( gulp.dest( COMPILED_PATH ) );
	};
	w.on( 'update', bundle );
	w.on( 'error', function(){
		console.log('error', arguments);
	})
	return bundle();
});

gulp.task( 'inline sources', function(){
	return gulp.src( HTML_SRC_FILE )
        .pipe( gulp_smoosher() )
        .pipe( gulp.dest( COMPILED_PATH ) );
});

gulp.task( 'watch css', function(){
	gulp.watch( LESS_SRC_FILE, ['compile css'] );
});

gulp.task( 'watch compiled assets', function(){
	gulp.watch( COMPILED_ASSETS_FILES, ['inline sources'] );
});

gulp.task( 'default', ['compile css', 'compile js', 'inline sources', 'watch css', 'watch compiled assets'] );