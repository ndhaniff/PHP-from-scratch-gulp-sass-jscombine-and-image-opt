const gulp = require('gulp')
const browsersync = require('browser-sync').create()
const sass = require('gulp-sass')
const autoprefixer = require('gulp-autoprefixer');


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
gulp.task('serve', ['sass'] ,function(){
  browsersync.init({
    server: './src'
  })
  gulp.watch(['src/scss/*.scss'], ['sass'])
  gulp.watch(['src/*.html']).on('change',browsersync.reload)
})

gulp.task('default',['serve'])
