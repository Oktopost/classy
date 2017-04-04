'use strict';


const gulp		= require('gulp');
const replace	= require('gulp-string-replace');


gulp.task('test', () => {
	console.log('Gulp works!');
});

gulp.task('build-web', () => {
	return gulp.src([
			'./build/namespace.js',
			'./src/Enum.js',
			'./src/Singleton.js',
			'./src/Classify.js'
		])
		
		// Delete module.export
		.pipe(replace(/require\('\.\/namespace.js'\)/, 'window.Classy'))
		
		// Save
		.pipe(gulp.dest('./web'))
});

gulp.task('build', ['build-web'], () => {
	
});