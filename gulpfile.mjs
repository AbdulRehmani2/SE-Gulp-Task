import gulp from "gulp";
import dartSass from "sass";
import gulpSass from "gulp-sass";
import autoprefixer from "gulp-autoprefixer";
import cleanCSS from "gulp-clean-css";

const sass = gulpSass(dartSass);

gulp.task("sass", function () {
  return gulp
    .src("sass/*.scss")
    .pipe(sass().on("error", sass.logError))
    .pipe(gulp.dest("css"));
});

gulp.task("autoprefix", function () {
  return gulp
    .src("css/*.css")
    .pipe(
      autoprefixer({
        cascade: false,
      })
    )
    .pipe(gulp.dest("css"));
});

gulp.task("minify-css", function () {
  return gulp
    .src("css/*.css")
    .pipe(cleanCSS({ compatibility: "ie8", level: 2 }))
    .pipe(gulp.dest("css"));
});

gulp.task("watch", function () {
  gulp.watch("sass/*.scss", gulp.series("sass", "autoprefix", "minify-css"));
});

gulp.task("default", gulp.series("sass", "autoprefix", "minify-css", "watch"));
