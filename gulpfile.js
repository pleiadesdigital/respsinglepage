var gulp = require('gulp');
var gutil = require('gulp-util');
var browserify = require('gulp-browserify');
var compass = require('gulp-compass');
var connect = require('gulp-connect');
var gulpif = require('gulp-if');
var uglify = require('gulp-uglify');
var minifyHTML = require('gulp-minify-html');
var concat = require('gulp-concat');
var maps = require("gulp-sourcemaps");
var path = require('path');


var env,
		jsSources,
		sassSources,
		htmlSources,
		outputDir,
		sassStyles;

env = 'development';

if (env==='development') {
	outputDir = 'builds/development';
	sassStyles = 'expanded';
} else {
	outputDir = 'builds/production';
	sassStyles = 'compressed';
}

jsSources = [
	// 'components/scripts/jqloader.js',
	'components/scripts/TweenMax.min.js',
	'components/scripts/jquery.scrollmagic.min.js',
	'components/scripts/script.js'
];

sassSources = ['components/sass/style.scss'];
htmlSources = [outputDir + '*.html'];

// JAVASCRIPT
gulp.task('js', function(){
	gulp.src(jsSources)
		.pipe(concat('script.js'))
		// .pipe(browserify())
		.on('error', gutil.log)
		.pipe(gulpif(env === 'production', uglify()))
		.pipe(gulp.dest(outputDir + '/js'))
		.pipe(connect.reload())
});

// COMPASS
gulp.task('compass', function(){
	gulp.src(sassSources)
		.pipe(compass({
			sourcemap: true,
			sass: 'components/sass',
			css: outputDir + '/css',
			image: outputDir + 'images',
			style: sassStyles,
			comments: true,
			require: ['susy', 'breakpoint']
		})
		.on('error', gutil.log))
		.pipe(gulp.dest(outputDir + '/css'))
		.pipe(connect.reload())
});

// WATCH
gulp.task('watch', function(){
	gulp.watch(jsSources, ['js']);
	gulp.watch(['components/sass/*.scss', 'components/sass/*/*.scss'], ['compass']);
	gulp.watch('builds/development/*.html', ['html']);
});

//CONNECT (browsers reloading)
gulp.task('connect', function(){
	connect.server({
		root: outputDir,
		livereload: true
	});
});

//HTML
gulp.task('html', function(){
	gulp.src('builds/development/*.html')
		.pipe(gulpif(env === 'production', minifyHTML()))
		.pipe(gulpif(env === 'production', gulp.dest(outputDir)))
		.pipe(connect.reload())
});

//Copy images to production
gulp.task('move', function(){
	gulp.src('builds/development/images/**/*.*')
	.pipe(gulpif(env === 'production', gulp.dest(outputDir + 'images')))
});

gulp.task('default', ['watch', 'html', 'js', 'compass', 'move', 'connect']);












































