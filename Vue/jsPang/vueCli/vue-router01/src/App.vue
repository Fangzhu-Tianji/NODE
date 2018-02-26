<template>
  <div id="app">
    <img src="./assets/logo.png">
    <h2 style="color:red;text-align:center;">导航</h2>
    <div>
      <router-link to="/">首页</router-link>
      <router-link to="/hi">hi页面</router-link>
      <router-link :to="{name:'/hi/hi1', params:{username:'zch', id: 888}}">-hi1页面</router-link>
      <router-link to="/hi/hi2">-hi2页面</router-link>
    </div>
    <p>{{$route.name}}</p>

    <router-view/>
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
</style>
