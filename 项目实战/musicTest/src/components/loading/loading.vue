<template>
  <div class="loading-container">
    <div class="loading">
      <img width="24" height="24" src="./loading.gif">
      <p class="desc">{{title}}</p>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  export default {
    props: {
      title: {
        type: String,
        default: '正在载入...'
      }
    }
  }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
.loading-container
  width: 100%
  height: 100%
  position: fixed
  top: 0
  left: 0
  background: rgba(0, 0, 0, .7)
  .loading
    width: 100%
    text-align: center
    position absolute
    top: 50%
    transform translateY(-50%)
    .desc
      line-height: 20px
      font-size: 12px
      color: rgba(255, 255, 255, 0.5)
</style>
