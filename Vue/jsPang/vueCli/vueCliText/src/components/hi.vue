<template>
    <div>
        <h2>{{ msg }}</h2>
        <router-view class="aaa"></router-view>
        <!-- <p>{{ $route.params.userName }}</p> -->
    </div>
</template>

<script>
export default {
  name: 'hi',
  data () {
    return {
      msg: 'hi 欢迎光临！！'
    }
  }
}
</script>

<style scoped>

</style>
