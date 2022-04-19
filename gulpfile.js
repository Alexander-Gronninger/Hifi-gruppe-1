//ES5 MODULES
import gulp from "gulp";
import uglifycss from "gulp-uglifycss";
import concat from "gulp-concat";
import uglifyjs from "gulp-uglify";
import imagemin from "gulp-imagemin";
import connect from "gulp-connect";
import sassImport from "sass";
import gulpSass from "gulp-sass";
import rename from "gulp-rename";
import include from "gulp-file-include";
import htmlmin from "gulp-htmlmin";
import sourcemaps from "gulp-sourcemaps";

const sass = gulpSass(sassImport);

function html() {
  return gulp
    .src("src/html/**/*.html")
    .pipe(sourcemaps.init())
    .pipe(include())
    .pipe(
      htmlmin({
        collapseWhitespace: true,
      })
    )
    .pipe(
      rename(function (path) {
        if (path.basename != "index") {
          path.dirname = path.dirname + "/" + path.basename;
          path.basename = "index";
        }
      })
    )
    .pipe(sourcemaps.write("."))
    .pipe(gulp.dest("build"))
    .pipe(connect.reload());
}

function buildHtml() {
  return gulp
    .src("src/html/**/*.html")
    .pipe(include())
    .pipe(
      htmlmin({
        collapseWhitespace: true,
      })
    )
    .pipe(
      rename(function (path) {
        if (path.basename != "index") {
          path.dirname = path.dirname + "/" + path.basename;
          path.basename = "index";
        }
      })
    )
    .pipe(gulp.dest("build"))
}

function css() {
  return gulp
    .src("src/styles/**/*.scss")
    .pipe(sourcemaps.init())
    .pipe(sass().on("error", sass.logError))
    .pipe(sourcemaps.write("."))
    .pipe(gulp.dest("build/styles"))
    .pipe(connect.reload());
}

function buildCss() {
  return gulp
    .src("src/styles/**/*.scss")
    .pipe(gulp.dest("build/styles"))
}

function js() {
  return gulp
    .src("src/js/**/*.js")
    .pipe(sourcemaps.init())
    .pipe(uglifyjs())
    .pipe(sourcemaps.write("."))
    .pipe(gulp.dest("build/js"))
    .pipe(connect.reload());
}

function buildJs() {
  return gulp
    .src("src/js/**/*.js")
    .pipe(uglifyjs())
    .pipe(gulp.dest("build/js"))
}

function images() {
  return gulp
    .src("src/images/**/*")
    .pipe(imagemin())
    .pipe(gulp.dest("build/images"))
    .pipe(connect.reload());
}

function buildImages() {
  return gulp
    .src("src/images/**/*")
    .pipe(imagemin())
    .pipe(gulp.dest("build/images"))
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

export const build = gulp.parallel([buildHtml, buildCss, buildJs, buildImages]);