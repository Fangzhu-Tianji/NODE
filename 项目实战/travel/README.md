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

- @/assets/styles/border.css 解决一像素边框问题(加入**border-bottom**样式就可以了)
- 页面css引入方式，注意~ 例： **@import '~styles/varibles.styl'**
- css scoped中想要覆盖外部的css样式加入>>> 例： .wrapper >>> .swiper-pagination-bullet-active
- css height想要设置为宽度百分比 height:0; padding-bottom:20%;
- flex: 1时想要溢出隐藏，加入属性min-width: 0;
- webpack.base.conf.js - **alias** 配置路径
- npm加版本号 cnpm install vue-awesome-swiper**@2.6.7** --save
- **fastclick** 解决click事件300毫秒延迟
- props传入的参数不确定数据类型时设置为null
- window方法在所有组件里面都会生效，destroyed可以移除对应的window方法
- scrollBehavior当切换到新路由时，页面滚到顶部(这个功能只在支持 history.pushState 的浏览器中可用)
- config - index.js - **proxyTable** 跨域和配置多个域名
- dev加入--host 0.0.0.0 可以进行手机端调试
- ref可以当类似于ID的用法，this.$refs.id可以获取到对应的dom
- router-link添加tag默认a标签可以改变
- vuex的写法可以参考City-components-List页面(state,mutation)