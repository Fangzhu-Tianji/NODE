<template>
  <div id="app">
    <img src="./assets/logo.png">
    <div>
      <router-link to="/">首页</router-link>
      <router-link to="/page1">page1</router-link>
      <router-link to="/page2">page2</router-link>
      <router-link to="/page3">page3</router-link>
    </div>
    <div>
      <button @click="goBack">后退</button>
      <button @click="goGo">前进</button>
      <button @click="goHome">首页</button>
      <button @click="goPage2">page2</button>
      <!-- <button @click="goPage3">page3</button> -->
    </div>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  methods: {
    goBack () {
      this.$router.go(-1);
    },
    goGo () {
      this.$router.go(1);
    },
    goHome () {
      this.$router.push('/');
    },
    goPage2 () {
      this.$router.push('/page2');
    }
    // goPage3 () {
    //   this.$router.replace('/page3');
    // }
  }
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
