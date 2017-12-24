const gulp = require('gulp')
const browsersync = require('browser-sync').create()
const sass = require('gulp-sass')
const autoprefixer = require('gulp-autoprefixer');
const jade = require('gulp-jade')

//compile html
gulp.task('jade',function(){
  return gulp.src('src/templates/*.jade')
  .pipe(jade({pretty: true}))
  .pipe(gulp.dest('src'))
  .pipe(browsersync.stream())
})


//compile sass
gulp.task('sass',function(){
  return gulp.src(['src/scss/*.scss'])
  .pipe(sass.sync({outputStyle: 'compressed'}).on('error',sass.logError))
  .pipe(autoprefixer({
    browsers: ['last 2 versions'],
    cascade: false
  }))
  .pipe(gulp.dest('src/css'))
  .pipe(browsersync.stream())
})

//watch serve
gulp.task('serve', ['jade','sass'] ,function(){
  browsersync.init({
    server: './src'
  })
  gulp.watch(['src/templates/*.jade'], ['jade'])
  gulp.watch(['src/scss/*.scss'], ['sass'])
  gulp.watch(['src/*.html']).on('change',browsersync.reload)
})

gulp.task('default',['serve'])
