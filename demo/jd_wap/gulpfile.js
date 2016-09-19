var gulp = require('gulp'),
	less = require('gulp-less'),
	connect = require('gulp-connect'),
	include = require('gulp-file-include');

gulp.task('less', function(){
	gulp.src('./less/main.less')
		.pipe(less())
		.pipe(gulp.dest('./css'));
});

gulp.task('watch', function(){
	gulp.watch(['./less/*.less', './html/*.html', './js/*.js'], ['less', 'html', 'html']);
});

gulp.task('connect', function(){
	connect.server({
		// root: 'dest',
		livereload: true
	})
});

gulp.task('html', function(){
	gulp.src('./html/*.html')
		.pipe(include({ prefix: '@@', basepath: '@file' }))
		.pipe(gulp.dest('./dest/'))
		.pipe(connect.reload());
});

gulp.task('default', ['less', 'connect', 'html', 'watch']);




