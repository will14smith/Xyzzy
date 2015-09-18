import gulp from 'gulp';
import sass from 'gulp-sass';
import babelify from 'babelify';
import browserify from 'browserify';
import source from 'vinyl-source-stream';
import buffer from 'vinyl-buffer';
import eslint from 'gulp-eslint';
import webserver from 'gulp-webserver';

const dirs = {
  src: 'src',
  dest: 'dist',
};

gulp.task('html', () =>
  gulp.src(dirs.src + '/index.html')
    .pipe(gulp.dest(dirs.dest))
);

gulp.task('scripts', () =>
  browserify(dirs.src + '/scripts/app.js')
    .transform(babelify)
    .bundle()
    .pipe(source('app.js'))
    .pipe(buffer())
    .pipe(gulp.dest(dirs.dest))
);

gulp.task('styles', () =>
  gulp.src(dirs.src + '/styles/app.scss')

    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest(dirs.dest))
);

gulp.task('lint', () =>
  gulp.src([dirs.src + '/**/*.js'. __filename])
    .pipe(eslint())
    .pipe(eslint.format())
);

gulp.task('serve', () =>
  gulp.src('dist')
    .pipe(webserver({
      livereload: true,
      fallback: 'index.html',
      open: true
    }))
);
gulp.task('watch', ['default'], () => {
  gulp.watch(dirs.src + '/**/*.html', ['html']);
  gulp.watch(dirs.src + '/**/*.js', ['scripts', 'lint']);
  gulp.watch(dirs.src + '/**/*.scss', ['styles']);
});

gulp.task('default', ['html', 'scripts', 'styles', 'lint']);
