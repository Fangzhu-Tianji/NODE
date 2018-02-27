<template>
  <div id="app">
    <img src="./assets/logo.png">
    <div>
      <router-link to="/">首页</router-link><br />
      <router-link to="/gohome">gohome</router-link><br />
      <router-link to="/gocanshu/666/hellow world">gocanshu</router-link><br />
      <router-link to="/canshu/199/我是王者默认">canshu默认</router-link><br />
      <router-link to="/canshu/hhhh/我是王者无数字">canshu无数字</router-link><br />
      <router-link to="/zch">zch页面</router-link><br />
      <router-link to="/xiaxiede">我是瞎写的</router-link><br />
      <router-link to="/hanger/666/he">路由中的钩子</router-link><br />
    </div>
    <transition name="fade" mode="out-in">
      <router-view/>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.fade-enter {
  opacity: 0;
}
.fade-enter-active {
  opacity: 1;
}
.fade-leave {
  opacity: 1;
}
.fade-leave-active {
  opacity: 0;
  transition: opacity .5s;
}
</style>
