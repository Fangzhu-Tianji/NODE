var gulp = require('gulp');
var less = require('gulp-less');
var minifyCss = require('gulp-minify-css');
var autoprefixer = require('gulp-autoprefixer');
var rename = require('gulp-rename');
var notify = require('gulp-notify');
var jshint = require('gulp-jshint');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var clean = require('gulp-clean');
var rev = require('gulp-rev');
var revCollector = require('gulp-rev-collector');
var revReplace = require('gulp-rev-replace');
var replace = require('gulp-replace');
var cdn = require('gulp-cdn-replace');//cdn资源替换
var htmlmin = require('gulp-htmlmin');//html压缩
var runSequence = require('run-sequence');
const RESOURCES_DIR = 'src/main/resources/';//静态文件目录

gulp.task('less',function(){
    gulp.src([RESOURCES_DIR+'/static/style/*.less',RESOURCES_DIR+'/static/style/**/*.less'])
        .pipe(rev())
        .pipe(less())
        .pipe(autoprefixer({browsers:['last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4']}))//一定要写在less()后面
        //.pipe(gulp.dest(RESOURCES_DIR+'/dist/css/'))
        .pipe(minifyCss())
        .pipe(rename({suffix:'.min'}))
        .pipe(gulp.dest(RESOURCES_DIR+'/static/dist/css/'))
        .pipe(rev.manifest())
        .pipe(gulp.dest(RESOURCES_DIR+'/static/dist/css/'))
        .pipe(notify({ message: 'less task complete' }));
});

gulp.task('scripts',function(){
    gulp.src([RESOURCES_DIR+'/static/javascript/*.js',RESOURCES_DIR+'/static/javascript/**/*.js'])
        //.pipe(jshint('.jshintrc'))
        //.pipe(jshint.reporter('defalut'))
        //.pipe(concat('main.js'))
        .pipe(rev())
        .pipe(uglify())
        .pipe(rename({suffix:'.min'}))
        .pipe(gulp.dest(RESOURCES_DIR+'/static/dist/js/'))
        .pipe(rev.manifest())
        .pipe(gulp.dest(RESOURCES_DIR+'/static/dist/js/'))
        .pipe(notify({message:'scripts task complete'}))
});

gulp.task('clean',function(){
    gulp.src([RESOURCES_DIR+'/static/dist/css/',RESOURCES_DIR+'/static/dist/js/',RESOURCES_DIR+'/www-templates'],{read:false})
        .pipe(clean())
        .pipe(notify({message:'clean task complete'}))
});

//资源路径替换
gulp.task("revreplace",function(){
    var less_manifest = gulp.src(RESOURCES_DIR + "/static/dist/css/rev-manifest.json");
    var js_manifest = gulp.src(RESOURCES_DIR + "/static/dist/js/rev-manifest.json");

    //替换less资源路径
    gulp.src([RESOURCES_DIR+"/templates/*.html",RESOURCES_DIR+'/templates/**/*.html'])
        .pipe(htmlmin({collapseWhitespace:true}))
        .pipe(revReplace({manifest: less_manifest}))
        .pipe(replace('/style','/dist/css'))
        .pipe(revReplace({manifest: js_manifest}))
        .pipe(replace('/javascript','/dist/js'))
        .pipe(gulp.dest(RESOURCES_DIR+"/www-templates/"))
        .pipe(notify({message:'revreplace task complete'}));
});

gulp.task('cdn',function(){
    gulp.src([RESOURCES_DIR+"/www-templates/*.html",RESOURCES_DIR+'/www-templates/**/*.html'])
        .pipe(cdn({
            dir:RESOURCES_DIR+'/dist',
            root:{
                js:'http://demo.duobeiyun.com/',
                css:'http://demo.duobeiyun.com/'
            }
        }))
        .pipe(gulp.dest(RESOURCES_DIR+'/www-templates/'))
        .pipe(notify({message:'cdn task complete'}));
});
gulp.task('build',function(cb){
    runSequence('clean','less','scripts','revreplace','cdn',cb);
});