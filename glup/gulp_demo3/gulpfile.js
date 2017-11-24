var gulp = require('gulp'),
      less = require('gulp-less'), //less转css
      autoprefixer = require('gulp-autoprefixer'), //css设置浏览器版本自动处理浏览器前缀
      cssversion = require('gulp-make-css-url-version'), //css中引入的图片等加入版本号
      rename = require('gulp-rename'), //文件更名
      cleancss = require('gulp-clean-css'), //压缩css
      uglify = require('gulp-uglify'), //压缩js
      htmlmin = require('gulp-htmlmin'), //压缩html
      imagemin = require('gulp-imagemin'), //压缩图片
      concat = require('gulp-concat'), //合并文件
      clean = require('gulp-clean'), //删除文件
      watch = require('gulp-watch'), //文件同步
      connect = require('gulp-connect'), //创建本地服务器并实时刷新
      notify = require('gulp-notify'), //处理报错
      rev = require('gulp-rev'), //加md5后缀
      revCollector = require('gulp-rev-collector'), //路径替换
      gulpSequence = require('gulp-sequence'); //gulp顺序执行任务

gulp.task('css', function () {
    return gulp.src(['src/css/*.css', '!src/css/a.css'])
    .pipe(autoprefixer())
    .pipe(cssversion())
    .pipe(cleancss())
    .pipe(rev())
    .pipe(gulp.dest('dest/css'))
    .pipe(rev.manifest())
    .pipe(gulp.dest('dest/css'))
    .pipe(connect.reload())
    .pipe(notify({ message: 'css task complete' }));
});

gulp.task('less', function () {
    return gulp.src('src/less/*.less')
    .pipe(less())
    .pipe(autoprefixer())
    .pipe(cssversion())
    .pipe(gulp.dest('src/css'))
    .pipe(cleancss())
    .pipe(gulp.dest('dest/css'))
    .pipe(connect.reload())
    .pipe(notify({ message: 'less task complete' }));
});

gulp.task('images', function () {
    return gulp.src('src/images/*.{png,jpg,gif,ico}')
    .pipe(imagemin({
        optimizationLevel: 3, //类型：Number  默认：3  取值范围：0-7（优化等级）
        progressive: true, //类型：Boolean 默认：false 无损压缩jpg图片
        interlaced: true, //类型：Boolean 默认：false 隔行扫描gif进行渲染
        multipass: true //类型：Boolean 默认：false 多次优化svg直到完全优化
    }))
    .pipe(gulp.dest('dest/images'))
    .pipe(notify({ message: 'images task complete' }));
});

gulp.task('js', function () {
    return gulp.src(['src/js/a.js', 'src/js/b.js'])
    .pipe(concat('main.js'))
    .pipe(gulp.dest('src/js'))
    .pipe(uglify())
    .pipe(gulp.dest('dest/js'))
    .pipe(connect.reload())
    .pipe(notify({ message: 'js task complete' }));
});

gulp.task('sync', function () {
    return gulp.src(['src/lib', 'src/font'], {base: '.'})
    .pipe(gulp.dest('dest'))
    .pipe(notify({ message: 'sync task complete' }));
});

gulp.task('clean', function () {
    return gulp.src(['dest/css', 'dest/js', 'dest/lib'])
    .pipe(clean());
});

gulp.task('minHtml', function() {
    return gulp.src(['dest/css/*.json', 'src/**/*.html'])
    .pipe(revCollector())
    .pipe(htmlmin({
        removeComments: true,//清除HTML注释
        collapseWhitespace: true,//压缩HTML
        collapseBooleanAttributes: true,//省略布尔属性的值 <input checked="true"/> ==> <input />
        removeEmptyAttributes: true,//删除所有空格作属性值 <input id="" /> ==> <input />
        removeScriptTypeAttributes: true,//删除<script>的type="text/javascript"
        removeStyleLinkTypeAttributes: true,//删除<style>和<link>的type="text/css"
        minifyJS: true,//压缩页面JS
        minifyCSS: true//压缩页面CSS
    }))
    .pipe(gulp.dest('dest'));
});

gulp.task('connect', function () {
    connect.server({
        root: 'src',
        livereload: true
    });
});

gulp.task('watch', function() {
    gulp.watch('src/css/*.css', ['css']);
    gulp.watch('src/less/*.less', ['less']);
    gulp.watch(['src/js/*.js', '!src/js/main.js'], ['js']);
    gulp.watch('src/lib/*', ['sync']);
});

// gulp.task('default', ['clean'], function() {
//     gulp.start('less', 'css',  'js', 'sync', 'minHtml');
// });
// gulp.task('default', ['less', 'css',  'js', 'sync', 'minHtml']);
gulp.task('default', function(cb) {
    gulpSequence('clean', 'less', 'css', 'images', 'js', 'sync', 'minHtml', cb)
});
// gulp.task('default', ['concat', 'rev']);