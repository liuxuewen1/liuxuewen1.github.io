var gulp = require('gulp'),
	less = require('gulp-less'),
	connect = require('gulp-connect');

gulp.task('less', function(){
	gulp.src('./less/main.less')
		.pipe(less())
		.pipe(gulp.dest('./css'));
});

gulp.task('watch', function(){
	gulp.watch('./less/*.less', ['less']);
});

gulp.task('connect', function(){
	connect.server({
		// root: 'jd_wap',
		livereload: true
	})
});

gulp.task('default', ['less', 'connect', 'watch']);