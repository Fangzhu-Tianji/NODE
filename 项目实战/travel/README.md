# travel

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).



### 仿去哪儿项目

> 注意的知识点

- @/assets/styles/border.css 解决一像素边框问题
- fastclick 解决click事件300毫秒延迟
- webpack.base.conf.js - alias 配置路径
- npm加版本号 cnpm install vue-awesome-swiper@2.6.7 --save
- 页面css引入方式，注意~ 例： @import '~styles/varibles.styl'
- css scoped中想要覆盖外部的css样式加入>>> 例： .wrapper >>> .swiper-pagination-bullet-active
- css height想要设置为宽度百分比 height:0; padding-bottom:20%;
