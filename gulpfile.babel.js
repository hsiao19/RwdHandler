import gulp from 'gulp';
import babel from 'gulp-babel';
import uglify from 'gulp-uglify';
import rename from 'gulp-rename';
import sourcemaps from 'gulp-sourcemaps';

gulp.task('uglifyJS', function(){
  return gulp.src('src/*.js')
    .pipe(sourcemaps.init())
    .pipe(babel())
    .pipe(uglify({
        preserveComments: 'license',
    }))
    .pipe(rename({
        extname: '.min.js'
    }))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('dist'))
});

gulp.task('default', ['uglifyJS']);
