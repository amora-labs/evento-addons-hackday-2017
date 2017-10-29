const gulp = require('gulp');
const del = require('del');
const zip = require('gulp-zip');

const destFolder = gulp.dest('production');
const srcFolders = [
  'dist/*',
  'html/*',
  'images/*',
  'README.md',
  'manifest.json',
];

gulp.task('clean', () => del([
  'production/**/*',
]));

gulp.task('copy', ['clean'], () => gulp.src(srcFolders, { base: '.' })
  .pipe(destFolder));

gulp.task('production', ['copy'], () => gulp.src('production/**/*')
  .pipe(zip(`production-${Date.now()}.zip`))
  .pipe(gulp.dest('.')));
