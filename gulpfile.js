//引入gulp
const gulp = require('gulp');
/*************************************/
const concat = require('gulp-concat');
const pipeline = require('readable-stream').pipeline;
const uglify = require('gulp-uglify');
//css的操作
const uglifycss = require('gulp-uglifycss');
const concatcss = require('gulp-concat-css');
//重命名插件
const rename = require("gulp-rename");
//监视插件
const watch = require("gulp-watch");

function concatJs(cb) {
    return gulp.src('src/js/*.js')
        .pipe(concat('build.js'))
        .pipe(gulp.dest('dist/js/'));

    cb();
}
//aa
function reNameJs(cb){
    return gulp.src("dist/js/build.js")
        .pipe(rename("build.min.js"))
        .pipe(gulp.dest("dist/js/"));
    cb();
}
//async .... await 解决同步问题
//压缩js
async function uglifyJs(cb){
    console.log("===============")
    return await pipeline(
        gulp.src('dist/js/build.min.js'),
        uglify(),
        gulp.dest('dist/js/')
    );
    cb();
}
//合并CSS
function concatCss(cb) {
    return gulp.src('src/css/*.css')
        .pipe(concatcss('build.css'))
        .pipe(gulp.dest('dist/css/'));

    cb();
}
//压缩css
async function uglifyCss(cb){
    return await gulp.src('dist/css/build.min.css')
        .pipe(uglifycss())
        .pipe(gulp.dest('dist/css/'));
    cb();
}
function reNameCss(cb){
    return gulp.src("dist/css/build.css")
        .pipe(rename("build.min.css"))
        .pipe(gulp.dest("dist/css/"));
    cb();
}

//组合任务
const jsTask = gulp.series(concatJs,reNameJs,uglifyJs);
const cssTask = gulp.series(concatCss,reNameCss,uglifyCss);
const myTask = gulp.series(jsTask,cssTask);

function watchFun(cb){
    //gulp.series(defaultTask,reName,uglifyFun)
    //当执行watch时，文件内容发生改变时，就执行其他任务
    watch(['src/**/*','gulpfile.js','index.html'] , gulp.series(myTask)
    );
    cb();
}
/*gulp.parallel(concatJs,reNameJs,uglifyJs),
gulp.parallel(concatCss,reNameCss,uglifyCss)
gulp.series(concatJs,reNameJs,uglifyJs,concatCss,reNameCss,uglifyCss)*/
/***********************
exports.default = gulp.series(gulp.parallel(watchFun,gulp.series(defaultTask,reName,uglifyFun)));
*/

//exports.default = gulp.series(defaultTask,reName,uglifyFun);
//exports.watchFun = gulp.series(watchFun)
exports.default = gulp.series(watchFun);
exports.test1 = gulp.series(concatJs,reNameJs,uglifyJs);
exports.test2 = gulp.parallel(concatJs,reNameJs,uglifyJs);
exports.test4 = gulp.series(concatCss,reNameCss,uglifyCss);
exports.test3  = gulp.parallel(concatCss,reNameCss,uglifyCss);