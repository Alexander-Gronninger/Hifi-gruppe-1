//ES5 MODULES
import gulp from "gulp";
import uglifycss from "gulp-uglifycss";
import concat from "gulp-concat";
import uglifyjs from "gulp-uglify";
import imagemin from "gulp-imagemin";
import connect from "gulp-connect";
import sassImport from "sass";
import gulpSass from "gulp-sass";

const sass = gulpSass(sassImport);

function html() {
  return gulp
    .src("src/html/**/*.html")
    .pipe(gulp.dest("build"))
    .pipe(connect.reload());
}

function css() {
  return gulp
    .src("src/styles/**/*.scss")
    .pipe(sass().on("error", sass.logError))
    .pipe(gulp.dest("build/styles"))
    .pipe(connect.reload());
}

function js() {
  return gulp
    .src("src/js/**/*.js")
    .pipe(uglifyjs())
    .pipe(gulp.dest("build/js"))
    .pipe(connect.reload());
}

function images() {
  return gulp
    .src("src/images/**/*")
    .pipe(imagemin())
    .pipe(gulp.dest("build/images"))
    .pipe(connect.reload());
}

function watchHTML() {
  gulp.watch(
    "src/html/**/*.html",
    {
      events: "all",
      ignoreInitial: false,
    },
    function (cb) {
      html();
      cb();
    }
  );
}

function watchCSS() {
  gulp.watch(
    "src/styles/**/*.scss",
    {
      events: "all",
      ignoreInitial: false,
    },
    function (cb) {
      css();
      cb();
    }
  );
}

function watchJS() {
  gulp.watch(
    "src/js/**/*.js",
    {
      events: "all",
      ignoreInitial: false,
    },
    function (cb) {
      js();
      cb();
    }
  );
}

function watchIMG() {
  gulp.watch(
    "src/images/**/*",
    {
      events: "all",
      ignoreInitial: false,
    },
    function (cb) {
      images();
      cb();
    }
  );
}

function server() {
  connect.server({
    root: "build",
    livereload: true,
  });
}

//how to execute mutliple functions
export const watcher = gulp.parallel([watchHTML, watchCSS, watchJS, watchIMG]);

//exports functions as standalone
export { html, css, js, images, watchCSS, watchJS, watchIMG };
//default is same as typing gulp
export default gulp.parallel([watcher, server]);
