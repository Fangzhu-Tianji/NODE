var gulp = require('gulp'),
      autoprefixer = require('gulp-autoprefixer'), //css设置浏览器版本自动处理浏览器前缀
      cssversion = require('gulp-make-css-url-version'), //css中引入的图片等加入版本号
      cleancss = require('gulp-clean-css'), //压缩css
      uglify = require('gulp-uglify'), //压缩js
      htmlmin = require('gulp-htmlmin'), //压缩html
      imagemin = require('gulp-imagemin'), //压缩图片
      clean = require('gulp-clean'), //删除文件
      connect = require('gulp-connect'), //创建本地服务器并实时刷新
      notify = require('gulp-notify'), //处理报错
      rev = require('gulp-rev'), //加md5后缀
      revCollector = require('gulp-rev-collector'), //路径替换
      gulpSequence = require('gulp-sequence'); //gulp顺序执行任务

gulp.task('css', function () {
    return gulp.src(['src/css/*.css'])
    .pipe(autoprefixer())
    .pipe(cssversion())
    .pipe(cleancss())
    .pipe(rev())
    .pipe(gulp.dest('build/css'))
    .pipe(rev.manifest())
    .pipe(gulp.dest('build/css'))
    .pipe(notify({ message: 'css task complete' }));
});

gulp.task('images', function () {
    return gulp.src('src/images/**')
    .pipe(imagemin())
    .pipe(gulp.dest('build/images'))
    .pipe(notify({ message: 'images task complete' }));
});

gulp.task('js', function () {
    return gulp.src(['src/js/**'])
    .pipe(uglify())
    .pipe(rev())
    .pipe(gulp.dest('build/js'))
    .pipe(rev.manifest())
    .pipe(gulp.dest('build/js'))
    .pipe(notify({ message: 'js task complete' }));
});

gulp.task('minHtml', function() {
    gulp.src(['build/**/rev-manifest.json', 'src/Product/*.html'])
    .pipe(revCollector())
    .pipe(htmlmin({
        removeComments: true,//清除HTML注释
        collapseWhitespace: true,//压缩HTML
        collapseBooleanAttributes: true,//省略布尔属性的值 <input checked="true"/> ==> <input />
        removeEmptyAttributes: true,//删除所有空格作属性值 <input id="" /> ==> <input />
        removeScriptTypeAttributes: true,//删除<script>的type="text/javascript"
        removeStyleLinkTypeAttributes: true//删除<style>和<link>的type="text/css"
    }))
    .pipe(gulp.dest('build/Product'));
    gulp.src(['build/**/rev-manifest.json', 'src/index.html'])
    .pipe(revCollector())
    .pipe(htmlmin({
        removeComments: true,//清除HTML注释
        collapseWhitespace: true,//压缩HTML
        collapseBooleanAttributes: true,//省略布尔属性的值 <input checked="true"/> ==> <input />
        removeEmptyAttributes: true,//删除所有空格作属性值 <input id="" /> ==> <input />
        removeScriptTypeAttributes: true,//删除<script>的type="text/javascript"
        removeStyleLinkTypeAttributes: true//删除<style>和<link>的type="text/css"
    }))
    .pipe(gulp.dest('build'));
});

// gulp.task('synclib', function () {
//     return gulp.src(['src/lib/**/*'])
//     .pipe(gulp.dest('build/lib'))
//     .pipe(notify({ message: 'sync task complete' }));
// });
// gulp.task('syncfont', function () {
//     return gulp.src(['src/font/**/*'])
//     .pipe(gulp.dest('build/font'))
//     .pipe(notify({ message: 'sync task complete' }));
// });
gulp.task('sync', function () {
    gulp.src(['src/lib/**/*'])
    .pipe(gulp.dest('build/lib'))
    gulp.src(['src/font/**/*'])
    .pipe(gulp.dest('build/font'))
    .pipe(notify({ message: 'sync task complete' }));
});

gulp.task('clean', function () {
    return gulp.src('build/*')
    .pipe(clean());
});

gulp.task('default', function(cb) {
    gulpSequence('clean', 'css', 'images', 'js', 'sync', 'minHtml', cb)
});

// 启动服务，监听修改
gulp.task('connect', function () {
    connect.server({
        root: 'src',
        livereload: true
    });
});

gulp.task('devload', function () {
    return gulp.src('src/*')
    .pipe(connect.reload())
});

gulp.task('watch', ['connect'], function () {
    gulp.watch('src/*', ['devload']);
});