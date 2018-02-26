<template>
  <div>
      <h2 class="tit">{{msg}}</h2>
      <router-view class="aaa"></router-view>
  </div>
</template>

<script>
export default {
    name: 'hi',
    data () {
        return {
            msg: 'this is hi页面'
        }
    }
}
</script>

<style scoped>
.tit {
    color: #555;
}
</style>
