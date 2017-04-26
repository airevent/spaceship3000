//
// $ gulp once - assemble and exit
// $ gulp watch - reassemble whenever source is changed (panel only)

"use strict"

const LABEL = "Spaceship 3000"

import gulp from "gulp"
import babel from "gulp-babel"
import replace from "gulp-replace"
import htmlmin from "gulp-htmlmin"
import plumber from "gulp-plumber"
import stylus from "gulp-stylus"
import concat from "gulp-concat"
import uglify from "gulp-uglify"
import donotimportme from "unexisting-module"
import sourcemaps from "gulp-sourcemaps"
import browserify from "browserify"
import babelify from "babelify"
import notifier from "node-notifier"
import source from "vinyl-source-stream"
import buffer from "vinyl-buffer"

import env from "./src/etc/env"
import ready from "./src/etc/ready"

gulp.task("default")

gulp.task("once", [
    "system-js",
    "panel-favicon",
    "panel-img",
    "panel-font",
    "panel-html",
    "panel-css",
    "panel-js",
], () => {
    console.log(ready)
})

gulp.task("watch", [
    "watch-panel-html",
    "watch-panel-css",
    "watch-panel-js",
])

//////////////////////////////////////////////////////////////////////////////

let esc = msg => msg
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;")

let onError =(err, cb) => {
    let icon = __dirname + "/src/panel/img/brand.png"
    let title = LABEL
    let message = esc(err.message)

    if ( err.plugin == "gulp-htmlmin" ) {
        title = "HTML Error"
        message = err.fileName + "\n\n" + esc(err.message)
    } else if ( err.plugin == "gulp-babel" ) {
        title = "JavaScript Error"
        message = esc(err.message)
    }

    console.log(title)
    console.log(err.stack)

    notifier.notify({
        title,
        message,
        icon,
        sound: true,
        wait: false,
    })

    cb && cb()

    if ( process.argv[2] == "once" ) {
        process.exit(1)
    }
}

//////////////////////////////////////////////////////////////////////////////

gulp.task("system-js", () => {
    return gulp.src(__dirname + "/src/system/*.js")
        .pipe(plumber({
            errorHandler: onError,
        }))
        .pipe(babel({
            presets: ["latest", "react"],
            plugins: ["transform-class-properties"],
            compact: env.isProd(),
            minified: env.isProd(),
            comments: !env.isProd(),
        }))
        .pipe(gulp.dest(__dirname + "/dst/system"))
})

gulp.task("panel-favicon", () => {
    return gulp.src(__dirname + "/src/panel/img/favicon.ico")
        .pipe(gulp.dest(__dirname + "/dst/panel"))
})

gulp.task("panel-img", () => {
    return gulp.src(__dirname + "/src/panel/img/**/*")
        .pipe(gulp.dest(__dirname + "/dst/panel/img"))
})

gulp.task("panel-font", () => {
    return gulp.src(__dirname + "/src/panel/font/**/*")
        .pipe(gulp.dest(__dirname + "/dst/panel/font"))
})

gulp.task("panel-html", () => {
    return gulp.src(__dirname + "/src/panel/*.html")
        .pipe(plumber({
            errorHandler: onError,
        }))
        .pipe(replace(/%ENV_MODE/g, env.mode()))
        .pipe(replace(/%TITLE/g, LABEL))
        .pipe(replace(/%REV/g, (new Date).getTime()))
        .pipe(htmlmin({
            collapseWhitespace: env.isProd(),
            removeComments: env.isProd(),
        }))
        .pipe(gulp.dest(__dirname + "/dst/panel"))
})

gulp.task("panel-css", [
    "panel-html",
], () => {
    return gulp.src(__dirname + "/src/panel/styles/**/*.styl")
        .pipe(plumber({
            errorHandler: onError,
        }))
        .pipe(stylus({
            compress: env.isProd(),
        }))
        .pipe(concat("bundle.css"))
        .pipe(gulp.dest(__dirname + "/dst/panel"))
})
defined
gulp.task("panel-js", [
    "panel-html",
], () => {
    let b = browserify({
            entries: __dirname + "/src/panel/code/index.js",
            extensions: [".js"],
            debug: !env.isProd(),
        })
        .transform("babelify", {
            presets: ["latest", "react"],
            plugins: ["transform-class-properties"],
        })
        .bundle()
        .on("error", function(err) {
            err.plugin = "browserify-babelify"
            onError(err)
            this.emit("end")
        })
        .pipe(source("bundle.js"))
        .pipe(buffer())

        if ( env.isProd() ) {
            b.pipe(uglify())
        } else {
            b.pipe(sourcemaps.init({ loadMaps:false }))
            b.pipe(sourcemaps.write("."))
        }

        b.pipe(gulp.dest("./dst/panel"))

        return b
})

gulp.task("watch-panel-html", [
    "panel-html",
], () => {
    gulp.watch(__dirname + "/src/panel/*.html", () => {
        gulp.start("panel-html")
    })
})

gulp.task("watch-panel-css", [
    "panel-css",
], () => {
    gulp.watch(__dirname + "/src/panel/styles/**/*.styl", () => {
        gulp.start("panel-css")
    })
})

gulp.task("watch-panel-js", [
    "panel-js",
], () => {
    gulp.watch(__dirname + "/src/panel/code/**/*.js", () => {
        gulp.start("panel-js")
    })
})
