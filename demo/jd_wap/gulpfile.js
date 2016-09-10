var gulp = require('gulp'),
	less = require('gulp-less'),
	connect = require('gulp-connect');

gulp.task('less', function(){
	gulp.src('./less/main.less')
		.pipe(less())
		.pipe(gulp.dest('./css'));
});

gulp.task('watch', function(){
	gulp.watch(['./less/*.less', './html/*.html'], ['less', 'html']);
});

gulp.task('connect', function(){
	connect.server({
		// root: 'jd_wap',
		livereload: true
	})
});

gulp.task('html', function(){
	gulp.src('./html/*.html')
		.pipe(connect.reload());
});

gulp.task('default', ['less', 'connect', 'watch']);