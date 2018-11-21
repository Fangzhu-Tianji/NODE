<template>
  <div class="tab">
    <router-link tag="div" class="tab-item" to="/one">
      <span class="tab-link">one</span>
    </router-link>
    <router-link tag="div" class="tab-item" to="/two">
      <span class="tab-link">two</span>
    </router-link>
    <router-link tag="div" class="tab-item" to="/three">
      <span class="tab-link">three</span>
    </router-link>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    name: 'Tab'
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .tab
    display: flex
    height: 44px
    line-height: 44px
    font-size: 14px
    .tab-item
      flex: 1
      text-align: center
      .tab-link
        padding-bottom: 5px
        color: #ffffff
      &.router-link-active
        .tab-link
          color: #ff4400
          border-bottom: 2px solid #fff444
</style>