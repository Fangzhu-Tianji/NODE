<template>
  <div id="app">
    <left-nav></left-nav>
    <div class="main">
      <router-view/>
    </div>
  </div>
</template>

<script>
import leftNav from '@/components/common/leftNav'
export default {
  name: 'App',
  components: {
    'left-nav': leftNav
  }
}
</script>

<style>
/* @import "http://at.alicdn.com/t/font_579274_zekrk1d9jm1gu8fr.css"; */
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
.main {
  float: left;
  width: 95%;
  height: 100%;
  background-color: #eff2f7;
  overflow: auto;
}
</style>
